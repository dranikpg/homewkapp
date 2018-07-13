import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class Entry extends Component {

  constructor(props) {
    super(props);
  }

  render(){
      return (
        <ListItem dense>
          <ListItemText inset
          primary={this.props.value.title}
          secondary={this.props.value.creator_name}
          />

        </ListItem>
      )
  }

}

export default Entry;
