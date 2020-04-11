import React, { Component } from 'react';
import './PacketView.css';
import { connect } from 'react-redux'

function GetProtocolName(id) {
    switch (id) {
        case 6:
            return 'TCP';
        default:
            return 'Other(' + id + ')'
    }
}

class PacketView extends Component {

    render() {

        const protocol = GetProtocolName(this.props.selected >= 0 ? this.props.packets[this.props.selected].protocol : 0);
        const source = this.props.selected >= 0 ? this.props.packets[this.props.selected].from : 0;
        const destination = this.props.selected >= 0 ? this.props.packets[this.props.selected].to : 0;

        const payloadHex = this.props.selected >= 0 ? this.props.packets[this.props.selected].data : 0;
        const payloadHuman = this.props.selected >= 0 ? this.props.packets[this.props.selected].data : 0;

        return (
            <div className="Packet-view">
                <div className="packet-details">
                    <p className="header">Info</p>
                    <p>Packet protocol: {protocol}</p>
                    <p>Packet source: {source}</p>
                    <p>Packet destination: {destination}</p>
                </div>
                <div className="packet-hex">
                    <p className="header">Payload hex</p>
                    {payloadHex}
                </div>
                <div className="packet-byte">
                    <p className="header">Payload ASCII</p>
                    {payloadHuman}
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