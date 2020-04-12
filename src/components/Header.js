import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AddPacket, ToggleListener } from '../actions/actions'
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
                    <select className="ip-select">
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
                                window.Listener.listen((packet) => {
                                    this.props.dispatch(AddPacket(packet));
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
        listening: state.listening
    }
}

export default connect(mapStateToProps)(Header);
