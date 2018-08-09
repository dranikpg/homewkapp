import React, { Component } from 'react';

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import BackIcon from '@material-ui/icons/ArrowBack'

import EditMG from '../../stores/EditMG';

import DateSubjHeader from './DateSubjHeader'
import DescHeader from './DescHeader'
import TagHeader from './TagHeader'

const fullW = {
     width: '100%'
};


const topHeader_s={
    marginLeft:'0px'
};

const btnDiv={
    marginTop:"20px"
};

//central data storage
let data = {};
let orig = {};


class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        descc:false,
        dsc:false,
        tag:false,
        s: EditMG.state(),
        sent:false
    }
  }


  _return(){
      this.props.history.goBack();
  }

  _abort(){
      EditMG.abort();
      this._return();
  }

  _delete(){
      EditMG.remove();
      this.setState({s:this.state.state, sent:true})
  }

  _save(){
      EditMG.save(data);
      this.setState({s:this.state.state, sent:true})
  }

  _change(){
      let state = EditMG.state();
      this.setState({s:state, sent:false})
  }

  // back button


  componentWillMount(){
      EditMG.change(this._change.bind(this));
      data = EditMG.item();
      orig = {};
      this._copyorig();
      console.log("Edit mount");
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
     if(data.id < 0) return this.state.dsc && this.state.descc&& this.state.tag;
     else return this.state.descc || this.state.tag;
  }

  tscpcall(tdata, valid){
      console.log("TPS call");
      console.log(tdata.date);
      data.date = tdata.date;
      data.subj = tdata.subj;
      this.setState(
        {
          descc:this.state.descc,
          dsc:valid,
          tag:this.state.tag,
          s:this.state.s,
          sent:this.state.sent
        }
      )
  }

  textcall(desc, valid){
      data.desc = desc;
      this.setState(
        {
           descc:valid,
           dsc:this.state.dsc,
           tag:this.state.tag,
           s:this.state.s,
           sent:this.state.sent
        }
      )
  }

  tagcall(tag, valid){
      data.tag = tag;
      this.setState(
          {
              descc:this.state.descc,
              dsc:this.state.dsc,
              tag:valid,
              s:this.state.s,
              sent:this.state.sent
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
          <div style={topHeader_s}>
            <DateSubjHeader
              defs={data.subj}
              defd={data.date}
              active={data.id==-1}
              cb={this.tscpcall.bind(this)}
                />
            <br/>
            <TagHeader
              cb={this.tagcall.bind(this)}
              val={data.tag}/>
          </div>
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

  _actionBTS(){
    let delb = '';
    if(data.id >= 0){
      delb = (
        <Button disabled={this.state.sent} color="secondary" onClick={this._delete.bind(this)}>
          DELETE
          <DeleteIcon  />
      </Button>)
    }
    return (
      <div style={btnDiv}>
        <Button onClick={this._abort.bind(this)}>
            BACK
            <BackIcon />
        </Button>
        <Button color="primary" disabled={!this.complete() || this.state.sent} onClick={this._save.bind(this)}>
            SAVE
            <SaveIcon />
        </Button>
        {delb}
      </div>
    )
  }

}

export default Edit;
