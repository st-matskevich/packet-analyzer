export const SelectPacket = packet => ({
    type: 'SELECT_PACKET',
    payload: packet
})

export const AddPackets = packets => ({
    type: 'ADD_PACKETS',
    payload: packets
})

export const SetHostname = hostname => ({
    type: 'SET_HOSTNAME',
    payload: hostname
})

export const SelectIP = ip => ({
    type: 'SELECT_IP',
    payload: ip
})

export const SetAvailableIPs = ips => ({
    type: 'SET_AVAILABLE_IPS',
    payload: ips
})

export const ToggleListener = flag => ({
    type: 'TOGGLE_LISTENER',
    payload: flag
})