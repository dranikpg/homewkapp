import React, { Component } from 'react';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import SubjEntry from './SubjEntry'

import moment from "moment"

class DayEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open:true
    }
  }

  handleClick(){
      this.setState({open:!this.state.open})
  }

  render(){
      let ar = [];
      for(var key in this.props.day){
          ar.push(
            (<SubjEntry subj={key} data={this.props.day[key]}/>)
          )
          //ar.push((<Divider/>))
      }

      let datetext = (moment(this.props.date, "YYYYMMDD").calendar()).split("at")[0];

      return (
        <React.Fragment>
          <ListItem button onClick={this.handleClick.bind(this)}>
            <ListItemText
              primary={datetext}
              primaryTypographyProps={{ variant: 'subheading' }}
             />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider/>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {ar}
            </List>
          </Collapse>
        </React.Fragment>
      )
  }

}

export default DayEntry;
