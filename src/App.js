import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import CollectionView from './components/CollectionView'
import PacketView from './components/PacketView'
import DialogContainer from './components/DialogContainer'
import { connect } from 'react-redux'
import { SetHostname, SetAvailableIPs } from './actions/actions'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(SetHostname(window.Listener.getHostname()));
    this.props.dispatch(SetAvailableIPs(window.Listener.getIPs()));
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <CollectionView></CollectionView>
        {this.props.selected ? <PacketView></PacketView> : null}
        {this.props.showDialogs ? <DialogContainer></DialogContainer> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selectedPacket,
    showDialogs: state.showDialogs
  }
}

export default connect(mapStateToProps)(App);
