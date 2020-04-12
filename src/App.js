import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import CollectionView from './components/CollectionView'
import PacketView from './components/PacketView'
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
        {this.props.selected >= 0 ? <PacketView></PacketView> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selectedPacket
  }
}

export default connect(mapStateToProps)(App);
