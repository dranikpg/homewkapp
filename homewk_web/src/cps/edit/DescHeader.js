import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField'

const style = {
  width:'100%'
}

class DescHeader extends React.Component{
  constructor(props){
    super(props);
  }

  _textChange(event){
      let val = event.target.value;
      if(this.props.orig == undefined || val != this.props.orig){
        if(val.length == undefined || val.length == 0)
          this.props.cb(val, false);
        else this.props.cb(val,true);
      }else{
          this.props.cb(val, false);
      }
  }

  render(){
      let ss = this.props.desc;
      return (
        <TextField
            style={style}
            id="multiline-flexible"
            label="Task"
            multiline
            defaultValue={ss}
            rowsMax="3"
            onChange={this._textChange.bind(this)}
            margin="normal"
          />
    )
  }

}

export default DescHeader;
