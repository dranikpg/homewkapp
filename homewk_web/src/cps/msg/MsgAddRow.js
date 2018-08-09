import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send';

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
          <Button disabled={this.state.d.length==0} color="primary" onClick={this._save.bind(this)}>
                Post
                <SendIcon />
          </Button>
        </React.Fragment>
    )
  }
}

export default MsgAddRow;
