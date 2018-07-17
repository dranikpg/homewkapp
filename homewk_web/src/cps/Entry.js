import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import U from '../stores/UserMG';
import A from '../actions/sa'

import {geticon} from '../util/tagUI'

class Entry extends Component {

  constructor(props) {
    super(props);
  }

  _openEdit(){
      A.edit(this.props.value)
  }


  render(){

      let cn = this.props.value.creator_name;
      if(cn == U.user().name) cn = 'YoU'

      let editcp = '';
      if(this.props.value.creator_name == U.user().name){
        editcp = (
          (
            <React.Fragment>
                <IconButton onClick={this._openEdit.bind(this)} aria-label="Delete">
                   <EditIcon />
                </IconButton>
            </React.Fragment>
          )
        )
      }

      return (
        <ListItem dense>
          {geticon(this.props.value.tag)}
          <ListItemText inset
            primary={this.props.value.desc}
            secondary={cn}
          />
          {editcp}
        </ListItem>
      )
  }

}

export default Entry;
