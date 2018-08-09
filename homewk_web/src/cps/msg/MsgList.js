import React, { Component } from 'react';


import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import MessageI from '@material-ui/icons/Message'

import MsgAddRow from './MsgAddRow'

import U from '../../stores/UserMG'
import MsgStore from '../../stores/MsgStore'
import EA from '../../actions/ea'

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
    if(!U.user().admin && (this.state.m == undefined || this.state.m.length == 0))return (<p></p>);

    let rd = [];

    for(var msg in this.state.m){
       rd.push(this._for(this.state.m[msg]));
    }

    return (
      <Paper elevation={2}>
        <List
          dense>
          {rd}
        </List>
        {U.user().admin?
          (<MsgAddRow cb={this._create.bind(this)}  />):(<p/>)}
      </Paper>
    )
  }



  _for(msg){
    return (
      <ListItem>
        <ListItemText
          primary={msg.content}
        />
      {U.user().admin?
        (<IconButton onClick={this._delete.bind(this, msg.id)} aria-label="Edit">
           <DeleteIcon />
        </IconButton>):(<p/>)
      }
      </ListItem>
    )
  }

  _delete(id){
      EA.delete_msg(id);
  }

  _create(desc){
      EA.add_msg(desc);
  }

}

export default MsgList;
