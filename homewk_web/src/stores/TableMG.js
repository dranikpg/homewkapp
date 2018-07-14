import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

let data = [];

class TableMG extends EventEmitter{

  constructor() {
      super();
      Dispatcher.register(this._handle.bind(this));
  }

  _handlersp(){
    if (xhr.readyState === 4 && xhr.status === 200) {
      try{
        data = JSON.parse(xhr.responseText);
      }catch(error){
        console.log(error)
      }
    }
  }

  _handle(action) {
      // not loaded yet
      if(action.actionType == AT.LOAD_TS && data == undefined){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.onreadystatechange = this._handlersp.bind(this, xhr);
        xhr.open("GET", B.BASE_URL+"/pend", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
      }

  }

  tabled(d){
    return data[d];
  }

  table(){
    return data;
  }


}
