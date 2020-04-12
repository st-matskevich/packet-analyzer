export const SelectPacket = id => ({
    type: 'SELECT_PACKET',
    payload: id
})

export const AddPacket = packet => ({
    type: 'ADD_PACKETS',
    payload: packet
})

export const SetHostname = hostname => ({
    type: 'SET_HOSTNAME',
    payload: hostname
})

export const SetAvailableIPs = ips => ({
    type: 'SET_AVAILABLE_IPS',
    payload: ips
})

export const ToggleListener = flag => ({
    type: 'TOGGLE_LISTENER',
    payload: flag
})