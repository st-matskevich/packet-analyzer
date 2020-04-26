import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './CollectionView.css';
import { connect } from 'react-redux'
import { SelectPacket } from '../actions/actions'
import { GetProtocolName } from '../util/util'

class CollectionView extends Component {

    render() {

        const dispatch = this.props.dispatch;

        return (
            <TableContainer className="Collection-view">
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Protocol</TableCell>
                            <TableCell align="right">From</TableCell>
                            <TableCell align="right">To</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.packets.map((row) => {
                            return (
                                <TableRow key={row.id} hover
                                    selected={this.props.selected && this.props.selected.id == row.id}
                                    onClick={() => {
                                        dispatch(SelectPacket(row));
                                    }}>
                                    <TableCell component="th" scope="row">
                                        {GetProtocolName(row.protocol)}
                                    </TableCell>
                                    <TableCell align="right">{row.from}</TableCell>
                                    <TableCell align="right">{row.to}</TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        packets: state.packets,
        selected: state.selectedPacket
    }
}

export default connect(mapStateToProps)(CollectionView);