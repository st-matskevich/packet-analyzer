import React, { Component } from 'react';
import './PacketView.css';
import { connect } from 'react-redux'
import { GetProtocolName } from '../util/util'

class PacketView extends Component {

    render() {

        const protocol = GetProtocolName(this.props.packets[this.props.selected].protocol);
        const source = this.props.packets[this.props.selected].from;
        const destination = this.props.packets[this.props.selected].to;
        const payloadSize = this.props.packets[this.props.selected].size;

        const payloadHex = payloadSize > 0 ? this.props.packets[this.props.selected].hex : 'Empty packet';
        const payloadReadable = payloadSize > 0 ? this.props.packets[this.props.selected].data : 'Empty packet';

        return (
            <div className="Packet-view">
                <div className="packet-details">
                    <p className="header">Info</p>
                    <p>Packet protocol: {protocol}</p>
                    <p>Packet source: {source}</p>
                    <p>Packet destination: {destination}</p>
                    <p>Packet payload size: {payloadSize}</p>
                </div>
                <div className="packet-hex">
                    <p className="header">Payload hex</p>
                    {payloadHex}
                </div>
                <div className="packet-byte">
                    <p className="header">Payload ASCII</p>
                    {payloadReadable}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        packets: state.packets,
        selected: state.selectedPacket
    }
}

export default connect(mapStateToProps)(PacketView);