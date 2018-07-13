import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import AT from '../actions/const';


const CHANGE = 'CHANGE';
let edit = undefined;

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

    reset(){
      edit = {
        id:-1
      }
    }

    item(){
      return edit;
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
