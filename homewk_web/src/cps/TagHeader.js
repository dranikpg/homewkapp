import React, { Component } from 'react';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import TagStore from '../stores/TagStore'
import {geticon} from '../util/tagUI'

const select_s = {
    width:'50%',
}


const div_s={
    width:'80%',
    paddingLeft:'20px'
}

const icon_s={
    paddingLeft:'20px',
    marginTop:'20px'
}

class DescHeader extends React.Component{
  constructor(props){
    super(props);
    if(this.props.active){
      this.state = {
          tag: TagStore.getfor(0)
      }
    }else{
      this.state = {
          tag:TagStore.getfor(this.props.val)
      }
    }
  }

  componentWillMount(){
    if(this.props.active){
      this.props.cb(TagStore.indexof(this.state.tag));
    }
  }

  _handle(event){
      let newv = event.target.value;

      this.props.cb(TagStore.indexof(newv));

      this.setState({
        tag: newv
      })
  }

  render(){

      let ri = TagStore.getAll();
      let items = []

      for(var d in ri){
        items.push(<MenuItem value={ri[d]}>{ri[d]}</MenuItem>)
      }

      let icon = geticon(TagStore.indexof(this.state.tag));

      return (
          <div style={div_s}>
            <Select
              style={select_s}
              disabled={!this.props.active}
              value={this.state.tag}
              onChange={this._handle.bind(this)}
              inputProps={{
                name: 'Tag',
                id: 'tag',
              }}>{items}</Select>
              <span style={icon_s}>{icon}</span>
          </div>
      )
  }

}

export default DescHeader;
