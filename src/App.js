import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import CollectionView from './components/CollectionView'
import PacketView from './components/PacketView'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header></Header>
          <CollectionView></CollectionView>
          { this.props.selected >= 0 ? <PacketView></PacketView> : null }
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
