import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AddPackets, ToggleListener, SelectIP } from '../actions/actions'
import './Header.css';

import RecordIcon from '../icons/record.png'
import StopIcon from '../icons/stop.png'

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <div className="frame">
                    <h3 className="App-title">Packet Analyazer</h3>
                    <div className="exit-button" onClick={() => {
                        window.close();
                    }}></div>
                </div>
                <div className="sub-header">
                    <p>Host name: {this.props.hostname}</p>
                    <div className="spacer"></div>
                    <p>IP to bind to</p>
                    <select className="ip-select"
                        value={this.props.selectedIP}
                        onChange={(event) => { this.props.dispatch(SelectIP(event.target.value)) }} >
                        {this.props.availableIPs.map((ip) => {
                            return (
                                <option value={ip.key}>{ip.string}</option>
                            )
                        })}
                    </select>
                    <div className="control-button"
                        style={{
                            backgroundImage: this.props.listening ?
                                "url(" + StopIcon + ")" :
                                "url(" + RecordIcon + ")"
                        }}
                        onClick={() => {
                            if (!this.props.listening) {
                                window.Listener.listen(Number(this.props.selectedIP), (packet) => {
                                    this.props.dispatch(AddPackets(packet));
                                });
                            } else {
                                window.Listener.stop();
                            }
                            this.props.dispatch(ToggleListener(!this.props.listening));
                        }}>
                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        hostname: state.hostname,
        availableIPs: state.availableIPs,
        selectedIP: state.selectedIP,
        listening: state.listening
    }
}

export default connect(mapStateToProps)(Header);
