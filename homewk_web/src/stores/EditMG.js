import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

import {ffd} from '../util/date'

import AT from '../actions/const';
import B from '../base'

const CHANGE = 'CHANGE';

let edit = undefined;
let state = 'R';

class EditMG extends EventEmitter {

    constructor() {
        super();

        Dispatcher.register(this._handle.bind(this));
    }

    _handle(action) {
        if(action.actionType === AT.EDIT){
           edit = action.payload;
           if(edit === undefined){
              this.reset();
           }
           this._state('R');
        }
    }

    //

    abort(){
        this._state('R');
    }

    remove(){
        if(edit.id < 0) return;
        else {
            console.log("EG -> Deleting " + edit.id);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.onreadystatechange = this._handlersp.bind(this, xhr);
            xhr.open("POST", B.BASE_URL+"edit", true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(
                {
                    type:"D",
                    id:edit.id
                }
            ))

        }
    }

    save(data){
        console.log("Save request");
        if(data.id < 0){
          this.__create(data);
        }else{
          this.__save(data);
        }
    }

    __create(data){
      console.log("EG -> Creating " + data.tag?data.tag:0);
      console.log(data);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.onreadystatechange = this._handlersp.bind(this, xhr);
      xhr.open("POST", B.BASE_URL+"edit", true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(
          JSON.stringify(
              {type:"C",
               date:data.date,
               subj:data.subj,
               desc:data.desc,
               tag:data.tag
              }
          )
      );
    }


    __save(data){
      console.log("EG -> Saving " + data.id);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.onreadystatechange = this._handlersp.bind(this, xhr);
      xhr.open("POST", B.BASE_URL+"edit", true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({
          type:"E",
          id:data.id,
          desc:data.desc,
          tag:data.tag
      }));
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
      };
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
