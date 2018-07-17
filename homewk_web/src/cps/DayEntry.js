import React, { Component } from 'react';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import SubjEntry from './SubjEntry'

import TableStore from '../stores/TableStore'


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

      let d = moment(this.props.date, "YYYYMMDD").day() - 1;

      let ss = TableStore.getf(d);
      let ar = [];

      console.log('DE');
      console.log(ss);
      console.log(this.props.day)

      for(var key in ss){
          if(this.props.day[ss[key]] != undefined)
          ar.push(
            (<SubjEntry subj={ss[key]} data={this.props.day[ss[key]]}/>)
          );
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
