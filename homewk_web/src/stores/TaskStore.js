import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import AT from '../actions/const';

const CHANGE = 'CHANGE';
let _state = [];

class TaskStore extends EventEmitter {

    constructor() {
        super();
        Dispatcher.register(this._handle.bind(this));
    }

    _handle(action) {
        switch(action.actionType) {
            case AT.ADD_NEW_ITEM:
                this._addNewItem(action.payload);
            break;
        }
    }

    _addNewItem(item) {
        _state.push(item);
        this.emit(CHANGE);
    }

    allI() {
        return _state;
    }

    change(callback) {
        this.on(CHANGE, callback);
    }

    rmchange(callback) {
        this.removeListener(CHANGE, callback);
    }
}

export default new TaskStore();
