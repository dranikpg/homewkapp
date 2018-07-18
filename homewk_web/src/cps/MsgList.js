import React, { Component } from 'react';

import MsgStore from '../stores/MsgStore'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

import MessageI from '@material-ui/icons/Message'

class MsgList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        m:MsgStore.getAll()
    }
  }

  _change(){
    this.setState({
      m:MsgStore.getAll()
    })
  }

  componentWillMount(){
     MsgStore.change(this._change.bind(this));
  }

  componentWillUnmount(){
    MsgStore.rmchange(this._change);
  }

  render(){
    if(this.state.m == undefined || this.state.m.length == 0)return (<p></p>);

    let rd = [];

    for(var msg in this.state.m){
       rd.push(this._for(this.state.m[msg]));
    }

    return (
      <React.Fragment>
        <List
          dense
          subheader=
            {<ListSubheader component="div">Global messages</ListSubheader>}
        >
          {rd}
        </List>
      </React.Fragment>
    )
  }

  _for(msg){
    console.log(msg);
    return (
      <ListItem>
        <ListItemText
          primary={msg.content}
        />
      </ListItem>
    )
  }

}

export default MsgList;
