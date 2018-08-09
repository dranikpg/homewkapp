import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import Button from '@material-ui/core/Button'

import '../css/footer.css'

class Footer extends React.Component{

  render(){

    return (
      <div className="footer">
        <Button onClick={this._openhomepg.bind(this)}> Home </Button>
        <Button onClick={this._opengithub.bind(this)}> Source </Button>
        <Button onClick={this._openstat.bind(this)}> Statistics </Button>
      </div>

    )

  }

  _openstat(){
        this.props.history.push("/stat");
  }

  _openhomepg(){
      window.open("http://www.dranikpg.com","_self")
  }

  _opengithub(){
      window.open("https://github.com/DranikProgrammer/homewkapp","_self")
  }

}


export default withRouter(Footer);
