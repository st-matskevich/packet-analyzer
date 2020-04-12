export const GetProtocolName = (id) => {
    switch (id) {
        case 6:
            return 'TCP';
        case 17:
            return 'UDP';
        default:
            return 'Other(' + id + ')'
    }
}