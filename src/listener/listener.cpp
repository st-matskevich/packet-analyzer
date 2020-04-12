#include "listener.hpp"

std::string raw_to_string(const char *data, const unsigned int size)
{
	std::stringstream buf;
	for (unsigned int i = 0; i < size; i++)
	{
		if (data[i] >= 32 && data[i] <= 128)
			buf << data[i];
		else
			buf << '.';
	}
	return buf.str();
}

std::string raw_to_hex(const char *data, const unsigned int size)
{
	std::stringstream buf;
	for (unsigned int i = 0; i < size; i++)
		buf << std::hex << std::uppercase << (0xFF & data[i]) << ' ';
	return buf.str();
}

std::string ip_to_string(const unsigned int ip)
{
	std::stringstream buf;
	buf << ((ip & (255 << 24)) >> 24) << '.';
	buf << ((ip & (255 << 16)) >> 16) << '.';
	buf << ((ip & (255 << 8)) >> 8) << '.';
	buf << (ip & 255);
	return buf.str();
}

std::string Listener::get_hostname()
{
	WSADATA wsa_data;
	int wsa_result = WSAStartup(MAKEWORD(2, 2), &wsa_data);
	if (wsa_result != NO_ERROR)
		throw new std::runtime_error("Failed to init WSA");

	char buf[256];
	if (gethostname(buf, sizeof(buf)) == SOCKET_ERROR)
	{
		throw new std::runtime_error("Failed to get hostname");
	}

	WSACleanup();
	return std::string(buf);
}

std::vector<unsigned int> Listener::get_ips()
{
	std::vector<unsigned int> result;
	std::string hostname = Listener::get_hostname();
	WSADATA wsa_data;
	int wsa_result = WSAStartup(MAKEWORD(2, 2), &wsa_data);
	if (wsa_result != NO_ERROR)
		throw new std::runtime_error("Failed to init WSA");

	struct addrinfo hints, *res;
	memset(&hints, 0, sizeof(hints));
	hints.ai_family = AF_INET;
	hints.ai_socktype = SOCK_RAW;
	if (getaddrinfo(hostname.c_str(), NULL, &hints, &res))
		throw new std::runtime_error("Failed to get ips");

	struct addrinfo *rp;
	for (rp = res; rp != NULL; rp = rp->ai_next)
	{
		struct sockaddr_in *addr = (struct sockaddr_in *)rp->ai_addr;
		result.push_back(ntohl(addr->sin_addr.s_addr));
	}

	WSACleanup();
	return result;
}

bool Listener::listen(const unsigned int ip, const std::function<void(Packet)> on_accept)
{
	try
	{
		stop();

		socket = new Socket(ip);
		socket->listen([on_accept](char *res, unsigned int size) {
			IPV4_HDR *ipv4 = (IPV4_HDR *)res;
			Packet packet;

			packet.protocol = ipv4->ip_protocol;
			packet.from = ip_to_string(htonl(ipv4->ip_srcaddr));
			packet.to = ip_to_string(htonl(ipv4->ip_destaddr));

			if (ipv4->ip_protocol == 6)
			{
				TCP_HDR *tcp = (TCP_HDR *)(res + ipv4->ip_header_len * 4);
				packet.data_size = size - tcp->data_offset * 4 - ipv4->ip_header_len * 4;

				packet.readable_data = raw_to_string(res + ipv4->ip_header_len * 4 + tcp->data_offset * 4, packet.data_size);
				packet.hex_data = raw_to_hex(res + ipv4->ip_header_len * 4 + tcp->data_offset * 4, packet.data_size);
			}
			else if (ipv4->ip_protocol == 17)
			{
				UDP_HDR *udp = (UDP_HDR *)(res + ipv4->ip_header_len * 4);
				packet.data_size = size - sizeof(UDP_HDR) - ipv4->ip_header_len * 4;

				packet.readable_data = raw_to_string(res + ipv4->ip_header_len * 4 + sizeof(UDP_HDR), packet.data_size);
				packet.hex_data = raw_to_hex(res + ipv4->ip_header_len * 4 + sizeof(UDP_HDR), packet.data_size);
			}
			else
			{
				packet.data_size = size - sizeof(UDP_HDR) - ipv4->ip_header_len * 4;

				packet.readable_data = raw_to_string(res + ipv4->ip_header_len * 4, packet.data_size);
				packet.hex_data = raw_to_hex(res + ipv4->ip_header_len * 4, packet.data_size);
			}

			on_accept(packet);
		});
		return true;
	}
	catch (...)
	{
		//int err = WSAGetLastError();
		return false;
	}
}

void Listener::stop()
{
	if (socket != 0)
	{
		delete socket;
		socket = 0;
	}
}
