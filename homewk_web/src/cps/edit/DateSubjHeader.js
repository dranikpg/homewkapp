import React, { Component } from 'react';

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {formatd, parsed, ffd, fetchdd} from '../../util/date'

import TableMG from '../../stores/TableStore'

const subj_s={
  paddingLeft:'20px'
}

class TimeSubjCP extends React.Component {

/*  Props
  cb : data call-back,
  active : if active
*/

  constructor(props) {
    super(props);
    if(this.props.defd != undefined){
      this.state = {
        day: parsed(this.props.defd),
        subj: this.props.defs
      };
      console.log("DEF SUBJECT " + this.props.defs);
    }else{
      this.state = {
        day: undefined,
        subj:undefined
      };
    }

  }

  handleDayClick(day, {  disabled }) {
    if (disabled)return;
    if(!this.props.active) return;
    let dsubj = TableMG.getf(fetchdd(day))[0];
    this.props.cb(
      {
        date:ffd(day),
        subj: dsubj
      }, true);
    this.setState(
      {
      day: day,
      subj: dsubj
    });
  }

  handleSubjClick(event){
    this.props.cb(
      {
        date:ffd(this.state.day),
        subj: event.target.value
      }, true);
    this.setState({
      day:this.state.day,
      subj:event.target.value
    })
  }

  render() {
    let pos = TableMG.getf(fetchdd(this.state.day));
    let items = [];

    for(var d in pos){
      items.push(<MenuItem value={pos[d]}>{pos[d]}</MenuItem>)
    }

    let limit = new Date();
    limit.setDate(limit.getDate() + 21);

    let st = new Date();
    st.setDate(st.getDate()+1);


    return (

      <div>
        <DayPicker
          onDayClick={this.handleDayClick.bind(this)}
          selectedDays={this.state.day}
          format="YYYYMMDD"
          disabledDays={
            [
              {after: limit ,
              before:st},
              {daysOfWeek: [0,6]}
            ]
          }
        />
        <br/><span style={subj_s}>
        <Select
           disabled={!this.props.active||this.state.day==undefined}
           value={this.state.subj}
           onChange={this.handleSubjClick.bind(this)}
           inputProps={{
             name: 'subj',
             id: 'sbuj',
           }}
           >
           {items}
         </Select>
         </span>
      </div>
    );
  }
}

export default TimeSubjCP;
