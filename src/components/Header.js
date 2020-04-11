import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Header.css';

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
                                <option>{ip}</option>
                            )
                        })}
                    </select>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        hostname: state.hostname,
        availableIPs: state.availableIPs
    }
}

export default connect(mapStateToProps)(Header);
