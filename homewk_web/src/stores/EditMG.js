import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

import {ffd} from '../util/date'

import AT from '../actions/const';
import B from '../base'

const CHANGE = 'CHANGE';

let edit = undefined;
let state = 'N';

class EditMG extends EventEmitter {

    constructor() {
        super();

        Dispatcher.register(this._handle.bind(this));
    }

    _handle(action) {
        if(action.actionType == AT.EDIT_VW){
           edit = action.payload;
           if(edit == undefined){
              this.reset();
           }
        }
    }

    //

    remove(){
        if(edit.id < 0) return;
        else {
            console.log("EG -> Deleting " + edit.id);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.onreadystatechange = this._handlersp.bind(this, xhr);
            xhr.open("POST", B.BASE_URL+"edit", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("type=D"+"&id="+edit.id);
        }
    }

    save(data){
        console.log("Save reqzest");
        if(data.id < 0){
          this.__create(data);
        }else{
          this.__save(data);
        }
    }

    __create(data){
      console.log("EG -> Creating " + data.id);
      console.log(data);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.onreadystatechange = this._handlersp.bind(this, xhr);
      xhr.open("POST", B.BASE_URL+"edit", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send("type=C"+
          "&subj=maths"+
          "&date="+data.date+
          '&desc='+data.desc);
    }


    __save(data){
      console.log("EG -> Saving " + data.id);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.onreadystatechange = this._handlersp.bind(this, xhr);
      xhr.open("POST", B.BASE_URL+"edit", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send("type=E"+"&id="+data.id+'&desc='+data.desc);
    }

    _handlersp(xhr){
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('EG -> ' + xhr.responseText);
        if(xhr.responseText == 'OK'){
            this._state('S');
        }else {
            this._state('F');
        }
      }
    }

    //

    reset(){
      edit = {
        id:-1
      }
      this._state('N');
    }

    item(){
      return edit;
    }

    //

    _state(s){
        state = s;
        this.emit(CHANGE);
    }

    state(){
        return state;
    }

    //

    change(callback) {
        this.on(CHANGE, callback);
    }

    rmchange(callback) {
        this.removeListener(CHANGE, callback);
    }
}

export default new EditMG();
