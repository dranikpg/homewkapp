import React, { Component } from 'react';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import TagStore from '../../stores/TagStore'
import {geticon} from '../../util/tagUI'

import '../../css/tagheader.css'



const icon_s={
    paddingLeft:'20px',
    marginTop:'20px'
};

class TagHeader extends React.Component{

  constructor(props){
    super(props);
    this.start = this.props.val;
    this.state = {
        tag:TagStore.getfor(this.props.val)
    }
  }

  _handle(event){
      let newv = event.target.value;

      let id = TagStore.indexof(newv);

      console.log("start " + this.start + " now " + id);

      this.props.cb(id, id!==this.start);

      this.setState({
        tag: newv
      })
  }

  render(){

      let ri = TagStore.getAll();
      let items = [];

      for(var d in ri){
        items.push(<MenuItem value={ri[d]}>{ri[d]}</MenuItem>)
      }

      let icon = geticon(TagStore.indexof(this.state.tag));

      return (
          <div className="taghd_div">
            <Select
              className="taghd_select"
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

export default TagHeader;
