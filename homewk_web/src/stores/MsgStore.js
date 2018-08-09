import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

import AT from '../actions/const'
import B from '../base'

const CHANGE = 'CHANGE';

let data = undefined;

class MsgStore extends EventEmitter{

  constructor() {
      super();
      Dispatcher.register(this._handle.bind(this));
  }

  _handlersp(xhr){
    if (xhr.readyState === 4 && xhr.status === 200) {
      try{
        data = JSON.parse(xhr.responseText);
        console.log("MSGS -> parsed");
        console.log(data);
      }catch(error){
        console.log(error)
      }
      this.emit(CHANGE);
    }
  }

  _handleeditrsp(xhr){
    if (xhr.readyState === 4 && xhr.status === 200) {
      this._loadrq();
    }
  }

  _loadrq(){
    console.log("load req")
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.onreadystatechange = this._handlersp.bind(this, xhr);
    xhr.open("GET", B.BASE_URL+"msg", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
  }

  _handle(action) {
      // not loaded yet
      console.log(action);
      if(action.actionType == AT.LOAD_TS && data == undefined){
          this._loadrq();
      }else if(action.actionType == AT.LOAD_MSG){
          this._loadrq();
      }else if(action.actionType == AT.DELETE_MSG){
          this._deletemsg(action.payload);
      }else if(action.actionType == AT.CREATE_MSG){
          this._createmsg(action.payload);
      }

  }

  _createmsg(desc){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.onreadystatechange = this._handleeditrsp.bind(this, xhr);
    xhr.open("POST", B.BASE_URL+"msg", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("t=C&content="+desc);
  }

  _deletemsg(id){
    console.log("deleting " + id)
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.onreadystatechange = this._handleeditrsp.bind(this, xhr);
    xhr.open("POST", B.BASE_URL+"msg", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("t=R&id="+id);
  }

  getAll(){
    return data;
  }

  change(callback) {
      this.on(CHANGE, callback);
  }

  rmchange(callback) {
      this.removeListener(CHANGE, callback);
  }

}

export default new MsgStore();
