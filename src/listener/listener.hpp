#pragma once
#include <vector>
#include <string>
#include <sstream> 
#include "socket.hpp"
#include "headers.hpp"

struct Packet {
	std::string from, to;
	int protocol;
	int data_size;
	std::string readable_data, hex_data;
};

class Listener {
private:
	Socket* socket = 0;
public:
	static std::string get_hostname();
	static std::vector<unsigned int> get_ips();
	bool listen(const unsigned int ip, const std::function<void(Packet)> on_accept);
	void stop();
};

std::string ip_to_string(const unsigned int ip);