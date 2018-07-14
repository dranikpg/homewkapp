import React, { Component } from 'react';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {formatd, parsed, ffd} from '../util/date'


class TimeSubjCP extends React.Component {

/*  Props
  cb : data call-back,
  active : if active
*/

  constructor(props) {
    super(props);
    if(this.props.def != undefined){
      console.log("DSH -> Found def " + this.props.def);
      this.state = {
        day: parsed(this.props.def)
      };
      console.log("And that is " + parsed(this.props.def));
    }else{
      this.state = {
        day: undefined
      };
    }

  }

  handleDayClick(day, {  disabled }) {
    if (disabled)return;
    if(!this.props.active) return;
    this.props.cb(
      {
        date:ffd(day)
      }, true);
    this.setState({ day: day });
  }

  render() {
    return (
      <div>
        <DayPicker
          onDayClick={this.handleDayClick.bind(this)}
          selectedDays={this.state.day}
          format="YYYYMMDD"
          disabledDays={{ daysOfWeek: [0,6] }}
        />
        <p>{""}</p>
      </div>
    );
  }
}

export default TimeSubjCP;
