#pragma once

#include <winsock2.h>
#include <ws2tcpip.h>
#include <mstcpip.h>
#include <stdio.h>
#include <windows.h>
#include <stdexcept>
#include <functional>
#include <thread>

#pragma comment(lib,"WS2_32")

class Socket 
{
private:
	int handle;
	bool listening;
public:
	Socket(unsigned int ip);
	~Socket();

	void listen(const std::function<void(char*, unsigned int)> on_accept,
		const std::function<bool(int)> on_error = [](int err) -> bool{ return true; });
};