import React, { Component } from 'react';
import logo from './logo.svg';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import TaskList from './cps/TaskList'
import TaskAdder from './cps/TaskAdder'
import DebugPane from './cps/DebugPane'
import LoginForm from './cps/LoginForm'

import NavMG from './stores/NavMG'
import S from './base/appstate'

import Edit from './cps/Edit'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          s: NavMG.state()
        }
    }

    componentWillMount() {
       NavMG.change(this._stateChange.bind(this));
    }


    _stateChange(){
        console.log("APP:: " + this.state.s);
        this.setState({s:NavMG.state()});
    }

    render() {
      if(this.state.s == S.BASE)return this.renderBase();
      else if(this.state.s == S.LOGIN)return this.renderLogin();
      else if(this.state.s == S.EDIT) return this.renderEdit();
      else{
          return (
              <p>{this.state.s}</p>
          )
      }
    }


    renderEdit(){
        return(
          <Edit />
        )
    }

    renderLogin(){
        return (
          <LoginForm />
        )
    }

    renderBase(){
      return (
        <div className="App">
          <DebugPane/>
          <br/>
          <TaskAdder msg='HEYHO' />
          <br/>
          <TaskList msg='AYMAO' > LOL </TaskList>
        </div>
      );
    }

}

export default App;
