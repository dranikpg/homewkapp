import React, { Component } from 'react';
import logo from './logo.svg';

import { createMuiTheme,withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import TaskList from './cps/TaskList'
import TaskAdder from './cps/TaskAdder'
import DebugPane from './cps/DebugPane'
import LoginForm from './cps/LoginForm'

import NavMG from './stores/NavMG'
import S from './base/appstate'
import SA from './actions/sa'

import Edit from './cps/Edit'

const fab_style = {
   position: 'fixed',
   bottom: 40,
   right: 60,
}

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

    _newItem(){
        SA.newitem();
    }

    //

    render() {
      if(this.state.s == S.BASE)return this.renderBase();
      else if(this.state.s == S.LOGIN)return this.renderLogin();
      else if(this.state.s == S.EDIT) return this.renderEdit();
      else if(this.state.s == S.LOAD){
        return (<p>Проверим ка ваши куки</p>)
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
          <br/>
          <TaskList />
          <br/>
          <Button
            style={fab_style} color="secondary"
            variant="fab" aria-label="delete"
            onClick={this._newItem.bind(this)}>
            <AddIcon />
          </Button>
        </div>
      );
    }

}




export default (App);
