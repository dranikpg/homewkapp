import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

import AT from '../actions/const';
import B from '../base'


const CHANGE = 'CHANGE';
let items = [];

class TaskStore extends EventEmitter {

    constructor() {
        super();
        Dispatcher.register(this._handle.bind(this));
    }

    _handle(action) {
        switch(action.actionType) {
            case AT.LOAD_TS:
                this._load();
            break;
        }
    }

    _handlersp(xhr){
        if (xhr.readyState === 4 && xhr.status === 200) {
          try{
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            items = json;
          }catch(error){
            items = []
            console.log(error)
          }
          console.log("TS -> req end");
          this.emit(CHANGE);
          }
    }

    _load() {
        console.log("TS -> LOAD Running");
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.onreadystatechange = this._handlersp.bind(this, xhr);
        xhr.open("GET", B.BASE_URL+"/pend", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }

    allI() {
        return items;
    }

    change(callback) {
        this.on(CHANGE, callback);
    }

    rmchange(callback) {
        this.removeListener(CHANGE, callback);
    }
}

export default new TaskStore();
