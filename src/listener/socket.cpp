#include "socket.hpp"

int const SOCKET_RECV_BUFF = 65536;

Socket::Socket(unsigned int ip)
{
	WSADATA wsa_data;
	int wsa_result = WSAStartup(MAKEWORD(2, 2), &wsa_data);
	if (wsa_result != NO_ERROR)
		throw new std::runtime_error("Failed to init WSA");

	handle = socket(AF_INET, SOCK_RAW, IPPROTO_IP);
	if (handle == INVALID_SOCKET)
		throw new std::runtime_error("Failed to create socket");

	struct sockaddr_in addr;
	addr.sin_family = AF_INET;
	addr.sin_addr.s_addr = htonl(ip);
	addr.sin_port = htons(0);

	if (bind(handle, (struct sockaddr*) & addr, sizeof(addr)) == SOCKET_ERROR)
		throw new std::runtime_error("Failed to bind socket");

	int value = RCVALL_ON; //RCVALL_IPLEVEL?
	int out = 0;
	if (WSAIoctl(handle, SIO_RCVALL, &value, sizeof(value), 0, 0, (LPDWORD)&out, 0, 0) == SOCKET_ERROR) {
		throw new std::runtime_error("Failed to bind socket");
	}

	listening = false;
}

Socket::~Socket() 
{
	closesocket(handle);
	WSACleanup();
}

void Socket::listen(const std::function<void(char*, unsigned int)> on_accept, const std::function<bool(int)> on_error)
{
	if (listening)
		return;
	std::thread([on_accept, on_error](int handle)
	{
		char* packet_data = new char[SOCKET_RECV_BUFF];

		sockaddr_in from;
		int from_length = sizeof(from);

		while (true)
		{
			int received_bytes = recvfrom(handle, (char*)packet_data, SOCKET_RECV_BUFF, 0, (sockaddr*)&from, &from_length);

			if (received_bytes == SOCKET_ERROR)
			{
				if (on_error(WSAGetLastError())) break;
				continue;
			}

			if (received_bytes == 0)
				continue;

			on_accept(packet_data, received_bytes);
		}

		delete[] packet_data;
	}, handle).detach();
	listening = true;
}
