typedef struct ip_hdr
{
	unsigned char ip_header_len : 4; // 4-bit header length (in 32-bit words) normally=5 (Means 20 Bytes may be 24 also)
	unsigned char ip_version : 4;	 // 4-bit IPv4 version
	unsigned char ip_tos;			 // IP type of service
	unsigned short ip_total_length;  // Total length
	unsigned short ip_id;			 // Unique identifier

	unsigned char ip_frag_offset : 5; // Fragment offset field

	unsigned char ip_more_fragment : 1;
	unsigned char ip_dont_fragment : 1;
	unsigned char ip_reserved_zero : 1;

	unsigned char ip_frag_offset1;	 //fragment offset

	unsigned char ip_ttl;			 // Time to live
	unsigned char ip_protocol;		 // Protocol(TCP,UDP etc)
	unsigned short ip_checksum;		 // IP checksum
	unsigned int ip_srcaddr;		 // Source address
	unsigned int ip_destaddr;		 // Source address
} IPV4_HDR;

typedef struct udp_hdr
{
	unsigned short src_portno;       // Source port no.
	unsigned short dest_portno;      // Dest. port no.
	unsigned short udp_length;       // Udp packet length
	unsigned short udp_checksum;     // Udp checksum
} UDP_HDR;

typedef struct tcp_hdr
{
	unsigned short src_portno;       // Source port no.
	unsigned short dest_portno;      // Dest. port no.
	unsigned long  seq_num;          // Sequence number
	unsigned long  ack_num;          // Acknowledgement number;
	unsigned char reserved : 4;		 // Header reserved
	unsigned char data_offset : 4;   // Header lenght in 32-bit words
	unsigned char flags;			 // Header flags
	unsigned short window_size;      // Window size
	unsigned short tcp_checksum;     // Checksum
	unsigned short tcp_urgentptr;    // Urgent data?
} TCP_HDR;