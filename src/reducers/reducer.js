const MAX_PACKETS = 250;

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ('SELECT_PACKET'):
            return { ...state, selectedPacket: action.payload }
        case ('TOGGLE_LISTENER'):
            return { ...state, listening: action.payload }
        case ('SET_HOSTNAME'):
            return { ...state, hostname: action.payload }
        case ('SET_AVAILABLE_IPS'):
            return { ...state, selectedIP: state.selectedIP ? state.selectedIP : action.payload[0].key, availableIPs: action.payload }
        case ('SELECT_IP'):
            return { ...state, selectedIP: action.payload }
        case ('CLEAR_PACKETS'):
            return { ...state, packets: [], selectedPacket: undefined }
        case ('ADD_PACKETS'):
            return { ...state, packets: [...state.packets.slice(Math.max(0, state.packets.length - MAX_PACKETS + action.payload.length)), ...action.payload] }
        case ('SHOW_FILTER_DIALOG'):
            return { ...state, showDialogs: true, showFilterDialog: true }
        case ('HIDE_FILTER_DIALOG'):
            return { ...state, showDialogs: false, showFilterDialog: false }
        case ('SET_FILTER'):
            return { ...state, filter: action.payload}
        default:
            return state;
    }
}

const initialState = {
    hostname: 'host1',
    packets: [],
    availableIPs: [],
    selectedPacket: undefined,
    selectedIP: undefined,
    listening: false,
    showDialogs: false,
    showFilterDialog: false,
    filter: []
};