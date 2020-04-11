export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ('SELECT_PACKET'):
            return { ...state, selectedPacket: action.payload }
        case ('ADD_PACKETS'):
            return { ...state, packets: [...state.packets, ...action.payload] }
    }
    return state;
}

const initialState = {
    hostname: 'host1',
    availableIPs: [
        '192.168.0.100',
        '192.168.0.105',
        '192.168.0.110'
    ],
    selectedPacket: -1,
    packets: [
        {
            protocol: 6,
            from: '192.168.1.5',
            to: '192.168.1.1',
            data: 'test ask'
        },
        {
            protocol: 6,
            from: '192.168.1.5',
            to: '192.168.1.8',
            data: 'test ask'
        },
        {
            protocol: 6,
            from: '192.168.1.8',
            to: '192.168.1.5',
            data: 'test answer'
        },
        {
            protocol: 6,
            from: '192.168.1.5',
            to: '192.168.1.9',
            data: 'test data'
        },
        {
            protocol: 6,
            from: '192.168.1.5',
            to: '192.168.1.17',
            data: 'test data'
        },
        {
            protocol: 6,
            from: '192.168.1.17',
            to: '192.168.1.5',
            data: 'test data'
        },
        {
            protocol: 6,
            from: '192.168.1.5',
            to: '192.168.1.17',
            data: 'test data'
        },
        {
            protocol: 6,
            from: '192.168.1.17',
            to: '192.168.1.5',
            data: 'test data'
        }
    ]
};