import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

import AT from '../actions/const'
import B from '../base'

const CHANGE = 'CHANGE';

let data = undefined;
let loading = false;

class StatStore extends EventEmitter{

    constructor() {
        super();
        Dispatcher.register(this._handle.bind(this));
    }

    _handlersp(xhr){
        if (xhr.readyState === 4 && xhr.status === 200) {
            try{
                data = JSON.parse(xhr.responseText);
                console.log("Stat -> parsed");
                console.log(data);
            }catch(error){
                console.log(error)
            }
            loading = false;
            this.emit(CHANGE);
        }
    }

    _handle(action) {
        // not loaded yet
        if(action.actionType === AT.LOAD_STAT && data === undefined){
            if(loading)return;
            loading = true;

            console.log("stat loading");

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.onreadystatechange = this._handlersp.bind(this, xhr);
            xhr.open("GET", B.BASE_URL+"/stat", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
        }
    }

    loaded(){
        return data !== undefined;
    }

    get(){
        return data;
    }

    change(callback) {
        this.on(CHANGE, callback);
    }

    rmchange(callback) {
        this.removeListener(CHANGE, callback);
    }

}

export default new StatStore();