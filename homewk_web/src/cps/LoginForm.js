import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'


import UserMG from '../stores/UserMG'
import UA from '../actions/ua'

let fnick = "";
let fpw = "";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ready:UserMG.called(),
            err: false,
            iback:true
        }
    }

    componentWillMount(){
        if(UserMG.authed()){
            this.props.history.replace("/");
            return;
        }

        UserMG.change(this._update.bind(this));
        UA.startupAuth();
    }

    componentWillUnmount(){
        UserMG.rmchange(this._update);
    }

    _update(){
      console.log("LF -> I back");
      console.log(UserMG.authed());

      console.log(this.props.history);

      if(UserMG.authed()){
          fnick = "";
          fpw = "";
          this._return();
          return;
      }

      if(this.state.ready === false){
          this.setState({
              ready:true,
              err: false,
              iback:true
          });
          return;
      }

      this.setState({
          err:true,
          iback:true
      });
    }

    _return(){
        this.props.history.goBack("/");
    }

    _tryLogin(){
        console.log("LF -> Login try");
        this.setState({
          err:false,
          iback:false
        });
        UA.login(fnick, fpw);
    }

    _unick(event){
      fnick = event.target.value;
    }

    _upw(event){
      fpw = event.target.value;
    }

    render() {
        if(!this.state.ready){
            return "Cookie authentication check; direct access is pointless";
        }

        return (
          <div>
            <br/>
            <TextField
              error={this.state.err}
              id="nick"
              label="nick"
              defaultValue=""
              onChange={this._unick.bind(this)}
              />
            <br/>
            <TextField
              error={this.state.err}
              id="password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={this._upw.bind(this)}
              />
            <br/>
            <Button disabled={!this.state.iback} variant="contained" color="primary" onClick={this._tryLogin.bind(this)}>
              Login !
            </Button>

          </div>
          );
    }
}

export default LoginForm;
