import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import AT from '../actions/const';

import B from '../base/index.js';

const CHANGE = 'CHANGE';
let user = {
    id:-1
};

let called = false;

class UserMG extends EventEmitter {

    constructor() {
        super();
        Dispatcher.register(this._handle.bind(this));
    }

    // IMPL

    _handlersp(xhr){
        if (xhr.readyState === 4 && xhr.status === 200) {
          called=true;
          try{
            console.log(xhr.responseText);
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            if(json.id != undefined){
                user.id = json.id;
                user.nick=json.nick;
                user.name=json.name;
                user.admin=json.admin;
            }
            }catch(error){
              console.log(error)
            }
            console.log("UM -> req end");
            this.emit(CHANGE);
        }
    }

    _cfgrq(xhr){
        xhr.withCredentials = true;
        xhr.onreadystatechange = this._handlersp.bind(this, xhr);
    }

    startup(){
        console.log("UM -> Startup Running");
        var xhr = new XMLHttpRequest();
        var usg = this;
        xhr.open("GET", B.BASE_URL+"user", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        this._cfgrq(xhr);
        xhr.send();
    }

    login(name,pw){
        console.log("UM -> Login Running");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", B.BASE_URL+"login", true);
        this._cfgrq(xhr);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("username="+name+"&password="+pw+"&submit=Login");
    }

    // HD

    _handle(a) {
        if(a.actionType == AT.ST_AUTH) this.startup();
        else if(a.actionType == AT.AUTH) this.login(a.payload.name, a.payload.pw);
    }

    // HP

    called(){
        return called;
    }

    authed(){
      return user.id != -1;
    }

    user(){
      return user;
    }

    // CG

    change(callback) {
        this.on(CHANGE, callback);
    }

    rmchange(callback) {
        this.removeListener(CHANGE, callback);
    }
}

export default new UserMG();
