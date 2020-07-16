import React, { Component } from 'react';
import Header from './components/Header';
import Authors from './components/Authors';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Authors />
      </div>
    )
  }
}

export default App;
