import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

import S from '../base/index'
import A from '../actions/sa'

class DebugPane extends React.Component {
    constructor(props) {
        super(props);
    }

    _sendaajax(){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", S.BASE_URL+"user", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.withCredentials=true
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          console.log(json);
        }
      };
      xhr.send();
    }


    _newitem(){
        A.newitem();
    }

    render() {
        return (
          <div>
            <Button variant="contained" color="secondary" onClick={this._sendaajax.bind(this)} > AJAX </Button>
            <Button variant="contained" color="secondary" onClick={this._newitem.bind(this)} > New </Button>

          </div>
          );
    }
}

export default DebugPane;
