import React, { Component } from 'react';
import logo from './logo.svg';
import TaskList from './cps/TaskList.js'
import TaskAdder from './cps/TaskAdder.js'
import Button from '@material-ui/core/Button';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <TaskAdder msg='HEYHO' />
        <br/>
        <TaskList msg='PIZDA HEYHO' > LOL </TaskList>
      </div>
    );
  }
}

export default App;
