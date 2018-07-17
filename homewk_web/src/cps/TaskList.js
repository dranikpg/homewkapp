import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import TableStore from '../stores/TableStore'
import TaskStore from '../stores/TaskStore'
import TA from '../actions/la'
import SA from '../actions/sa'

import DayEntry from "./DayEntry"

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           items: []
        };
    }
    _onChange() {
        this.setState({ items: TaskStore.allI() });
        console.log(this.state);
    }

    componentWillMount() {
        this.setState({ items: TaskStore.allI() });
        TaskStore.change(this._onChange.bind(this));
        TableStore.change(this._onChange.bind(this));
        TA.load();
    }

    componentWillUnmount() {
        TaskStore.rmchange(this._onChange);
        TableStore.rmchange(this._onChange);
    }
    render() {
        let list = [];
        var i = 0;
        for(var date in this.state.items){
          //console.log(this.state.items[date]);
          list.push(
              (<DayEntry date={date} day={this.state.items[date]}/>)
          );
          i++;
        }

        let emptymsg =  i == 0 ? this._emptyHeader() : '';

        return (
          <React.Fragment>
              {emptymsg}
              <List>{list}</List>
          </React.Fragment>
        );
    }

    _emptyHeader(){
      return (<p>...</p>)
    }
}

export default TaskList;
