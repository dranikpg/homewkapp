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
      if(data.length != 0) this.emit(CHANGE);
    }
  }

  _handle(action) {
      // not loaded yet
      if(action.actionType == AT.LOAD_TS && data == undefined){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.onreadystatechange = this._handlersp.bind(this, xhr);
        xhr.open("GET", B.BASE_URL+"/msg", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
      }

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
