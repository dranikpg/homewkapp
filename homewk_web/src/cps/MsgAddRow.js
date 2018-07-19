import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save';

const style={
  'width':'70%'
}

class MsgAddRow extends React.Component{
  constructor(props){
    super(props);
    this.state =  {
      d:''
    }
  }

  _textChange(event){
      this.setState({
        d:event.target.value
      })
  }

  _save(){
      this.props.cb(this.state.d);
      this.setState({
        d:''
      })
  }



  render(){
      return (
        <React.Fragment>
          <TextField
              style={style}
              id="t"
              label="Message"
              defaultValue={''}
              rowsMax="3"
              onChange={this._textChange.bind(this)}
              margin="normal"
              value={this.state.d}
              />
          <Button color="primary" onClick={this._save.bind(this)}>
                SAVE
                <SaveIcon />
          </Button>
        </React.Fragment>
    )
  }
}

export default MsgAddRow;
