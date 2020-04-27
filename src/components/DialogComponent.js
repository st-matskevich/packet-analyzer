import React, { Component } from 'react';
import './DialogComponent.css'

class DialogComponent extends Component {
    render() {
        return (
            <div className="dialog-wrapper">
                <div className="dialog-header">
                    <h4>{this.props.title}</h4>
                </div>
                <div className="dialog-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default DialogComponent