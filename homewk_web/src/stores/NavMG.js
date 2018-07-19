import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import AT from '../actions/const';
import S from '../base/appstate'

import UserMG from './UserMG'

const CHANGE = 'CHANGE';
let state = S.LOAD;

class NavMG extends EventEmitter {

    constructor() {
        super();

        Dispatcher.register(this._handle.bind(this));
        UserMG.change(this._userchange.bind(this));
    }

    _handle(action) {

          console.log(action);
        if(action.actionType == AT.EDIT_VW){
          this._pushState(S.EDIT);
        }else if(action.actionType == AT._DEV_BASE){
          this._pushState(S.BASE);
        }
    }

    _userchange(){
        console.log("NM -> user change");
        if(UserMG.authed()) this._pushState(S.BASE);
        else this._pushState(S.LOGIN);
    }

    _pushState(st){
        console.log("State push " + st);
        state = st;
        this.emit(CHANGE);
    }

    state(){
      return state;
    }

    change(callback) {
        this.on(CHANGE, callback);
    }

    rmchange(callback) {
        this.removeListener(CHANGE, callback);
    }
}

export default new NavMG();
