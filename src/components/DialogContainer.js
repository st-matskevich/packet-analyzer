import React, { Component } from 'react';
import './DialogContainer.css';
import FilterDialog from './FilterDialog'

class DialogView extends Component {
    render() {
        return (
            <div className="hider">
                <FilterDialog></FilterDialog>
            </div>
        );
    }
}

export default DialogView