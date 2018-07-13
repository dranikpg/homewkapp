import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import Entry from './Entry'

class SubjEntry extends Component {

  constructor(props) {
    super(props);
  }

  render(){
      let ar = [];
      var es = this.props.data;
      for (var i = 0; i < es.length; i++) {
          ar.push((
            <Entry value={es[i]}/>
          ))
      }
      return (
          <React.Fragment>
            <ListItem dense>
              <ListItemText
                primary={this.props.subj}
                primaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
            {ar}
          </React.Fragment>
      )
  }

}

export default SubjEntry;
