import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

import ListActions from '../actions/la';

let val = "";

class TaskAdder extends React.Component {
    constructor(props) {
        super(props);
        this.eventlst = this._change.bind(this);
        this.buttonlst = this._create.bind(this);
    }

    _create(){
        ListActions.addNew(val);
    }

    _change(event){
        val = event.target.value;
    }

    render() {
        return (
          <div>
              <TextField
                id="text"
                label="Text"
                defaultValue=""
                onChange={this.eventlst} />
              <Button variant="contained" color="primary" onClick={this.buttonlst}> ADD </Button>
          </div>
          );
    }
}

export default TaskAdder;
