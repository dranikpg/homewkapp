import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import {Switch, Route } from 'react-router-dom';

import TaskList from './cps/tlist/TaskList'
import LoginForm from './cps/LoginForm'
import MsgList from './cps/msg/MsgList'
import Edit from './cps/edit/Edit'
import Footer from './cps/Footer'
import StatTestCP from './cps/stat/StatTestCP'

import UserMG from './stores/UserMG'
import EA from './actions/ea'

import { withRouter } from 'react-router'
import StatRootCP from "./cps/stat/StatRootCP";


const fab_style = {
   position: 'fixed',
   bottom: 40,
   right: 60,
}

class App extends Component {

    constructor(props) {
        super(props);

    }

    _newItem(){
        EA.newitem();
        const { history: { push } } = this.props;
        push("edit");
    }

    componentWillMount() {
        if(!UserMG.authed()) {
            this.props.history.push("/login");
        }
    }

    //

    render(){
      return(
          <Switch>
            <Route path='/stat' component={StatRootCP} />
            <Route path='/login' component={LoginForm} />
            <Route path='/edit' component={Edit} />
            <Route path='/' children={this.renderBase()} />
          </Switch>
      );
    }

    renderBase(){
      return (
        <div className="App">
          <MsgList />
          <br/>
          <TaskList />
          <br/>
          <Button
            style={fab_style} color="secondary"
            variant="fab" aria-label="delete"
            onClick={this._newItem.bind(this)}>
            <AddIcon />
          </Button>
          <Footer />
        </div>
      );
    }

}




export default withRouter(App);
