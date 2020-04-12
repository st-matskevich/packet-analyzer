const MAX_PACKETS = 1000;

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ('SELECT_PACKET'):
            return { ...state, selectedPacket: action.payload }
        case ('TOGGLE_LISTENER'):
            return { ...state, listening: action.payload }
        case ('SET_HOSTNAME'):
            return { ...state, hostname: action.payload }
        case ('SET_AVAILABLE_IPS'):
            return { ...state, availableIPs: action.payload }
        case ('CLEAR_PACKETS'):
            return { ...state, packets: [] }
        case ('ADD_PACKETS'):
            return { ...state, packets: [...state.packets.slice(Math.max(0, state.packets.length - MAX_PACKETS + 1)), action.payload] }
    }
    return state;
}

const initialState = {
    hostname: 'host1',
    availableIPs: [],
    selectedPacket: -1,
    listening: false,
    packets: []
};