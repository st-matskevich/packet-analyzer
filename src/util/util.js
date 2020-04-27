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

export const FilterPacket = (packet, filters) => {
    var result = filters.length ? false : true;

    filters.forEach((element) => {
        var tempResult = true;
        if (element.protocol)
            tempResult = tempResult && new RegExp(element.protocol).test(packet.protocol);

        if (element.from)
            tempResult = tempResult && new RegExp(element.from).test(packet.from);

        if (element.to)
            tempResult = tempResult && new RegExp(element.to).test(packet.to);

        if (element.text)
            tempResult = tempResult && new RegExp(element.text).test(packet.data);

        result = result || tempResult;
    });

    return result;
}

export const ValidateFilter = (filter) => {
    if (typeof filter !== typeof {})
        throw new Error('Failed to parse filter');

    if (!Array.isArray(filter))
        filter = [filter];

    filter.forEach((element, index) => {
        if (typeof element !== typeof {})
            throw new Error('Failed to parse filter');

        filter[index] = {};

        if (element.protocol)
            filter[index].protocol = element.protocol;
        if (element.from)
            filter[index].from = element.from;
        if (element.to)
            filter[index].to = element.to;
        if (element.text)
            filter[index].text = element.text;
    })

    return filter;
}