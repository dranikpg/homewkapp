import React, { Component } from 'react';

import Button from '@material-ui/core/Button'

class Footer extends React.Component{

  render(){

    return (
      <React.Fragment>
        <i>2018 dranikpg </i>
        <Button onClick={this._openhomepg.bind(this)}> Home </Button>
        <Button onClick={this._opengithub.bind(this)}> Source </Button>
      </React.Fragment>

    )

  }

  _openhomepg(){
      window.open("https://github.com/DranikProgrammer/homewkapp","_self")
  }

  _opengithub(){
      window.open("https://github.com/DranikProgrammer/homewkapp","_self")
  }

}


export default Footer;
