import React, { Component } from 'react';

import Button from '@material-ui/core/Button'

import EditMG from '../stores/EditMG';
import SA from '../actions/sa'


let data = {};

class Edit extends Component {

  constructor(props) {
    super(props);
  }

  _return(){
      SA._DEV_base();
  }

  componentWillMount(){
      data = EditMG.item();
  }

  componentWillUnmount(){
      EditMG.reset();
  }

  render(){
      let t = 'NEW';
      let i = EditMG.item();
      if(i.id > -1){
        t = i.title;
      }
      return (
        <div>
          <p>{t}</p>
          <Button onClick={this._return.bind(this)}> BACK </Button>
        </div>
      )
  }

}

export default Edit;
