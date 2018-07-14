import React, { Component } from 'react';

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import BackIcon from '@material-ui/icons/ArrowBack'

import EditMG from '../stores/EditMG';
import SA from '../actions/sa'

import DateSubjHeader from '../cps/DateSubjHeader'
import DescHeader from '../cps/DescHeader'

const fullW = {
     width: '100%'
};

const btnDiv={
    marginTop:"20px"
}

//central data storage
let data = {};
let orig = {};


class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        descc:false,
        dsc:false,
        s: EditMG.state()
    }
  }

  _return(){
      SA._DEV_base();
  }

  _delete(){
      EditMG.remove();
  }

  _save(){
      EditMG.save(data);
  }

  _change(){
      let state = EditMG.state();
      this.setState({s:state})
  }

  //

  componentWillMount(){
      EditMG.change(this._change.bind(this));
      data = EditMG.item();
      orig = {}
      this._copyorig();
      console.log(data);
  }

  _copyorig(){
    for (var property in data) {
        if (data.hasOwnProperty(property)) {
            orig[property] = data[property];
        }
    }
  }

  componentWillUnmount(){
      EditMG.rmchange(this._change);
      EditMG.reset();
      data = undefined;
      orig = undefined;
  }

  complete(){
     if(data.id < 0) return this.state.dsc && this.state.descc;
     else return this.state.descc;
  }

  tscpcall(tdata, valid){
      console.log("TPS call");
      console.log(tdata.date);
      data.date = tdata.date;
      this.setState(
        {
          descc:this.state.descc,
          dsc:valid,
          s:this.state.s
        }
      )
  }

  textcall(desc, valid){
      data.desc = desc;
      this.setState(
        {
          descc:valid,
          dsc:this.state.descc,
          s:this.state.s
        }
      )
  }

  updateState(){
    this.setState(
      {
        descc:data.desc != undefined && data.desc.length > 0,
        dsc:data.day != undefined,
        s:this.state.s
      }
    )
  }

  //

  render(){

      if(this.state.s == 'S'){
          this._return();
          return (<p>SUCCESS</p>)
      }else if(this.state.s == 'F'){
          this._return();
          return (<p>SUCESS</p>)
      }



      return (
        <div style={fullW}>

          <DateSubjHeader
            def={data.date}
            active={data.id==-1}
            cb={this.tscpcall.bind(this)}
              />

          <br/>

          <DescHeader
           orig={orig.desc}
           desc={data.desc}
           cb={this.textcall.bind(this)}
            />

          <br/>

          {this._actionBTS()}

        </div>
      )
  }

  _textChange(event, valid){
  }


  _actionBTS(){
    let delb = '';
    if(data.id >= 0){
      delb = (
        <Button color='secondary' onClick={this._delete.bind(this)}>
          DELETE
          <DeleteIcon  />
      </Button>)
    }
    return (
      <div style={btnDiv}>
        <Button onClick={this._return.bind(this)}>
            BACK
            <BackIcon />
        </Button>
        <Button disabled={!this.complete()} onClick={this._save.bind(this)}>
            SAVE
            <SaveIcon />
        </Button>
        {delb}
      </div>
    )
  }

}

export default Edit;