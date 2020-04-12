{
    "targets": [
        {
            "target_name": "listener",
            "sources": [ "./src/listener/socket.cpp", "./src/listener/listener.cpp", "./src/listener/node.cpp" ],
            "include_dirs": [
                "<!(node -e \"require('nan')\")"
            ]
        }
    ]
}