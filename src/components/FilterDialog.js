import React, { Component } from 'react';
import DialogComponent from './DialogComponent'
import './FilterDialog.css'
import { connect } from 'react-redux'
import { CloseFilterDialog, SetFilter } from '../actions/actions'
import { ValidateFilter } from '../util/util';

class FilterDialog extends Component {
    constructor(props) {
        super(props);
        this.state = { input: JSON.stringify(props.filter) };
    }

    render() {
        return (
            <DialogComponent title="Filter settings">
                <div>
                    <textarea className="filter-input" cols="40" rows="10" value={this.state.input} onChange={(event) => {
                        this.setState({ input: event.target.value })
                    }}></textarea>
                    <div className="buttons-wrapper">
                        <div className="button" onClick={() => {
                            this.props.dispatch(CloseFilterDialog());
                        }}>
                            Cancel
                        </div>
                        <div className="button" onClick={() => {
                            try {
                                var filter = JSON.parse(this.state.input);
                                filter = ValidateFilter(filter);
                                this.props.dispatch(SetFilter(filter));    

                            } catch {
                                //error parsing
                            }
                        }}>
                            Save
                        </div>
                    </div>
                </div>
            </DialogComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        filter: state.filter
    }
}

export default connect(mapStateToProps)(FilterDialog);