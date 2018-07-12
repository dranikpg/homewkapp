import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import AT from '../actions/const';

const CHANGE = 'CHANGE';
let _state = [];

class TaskStore extends EventEmitter {

    constructor() {
        super();
        // Registers action handler with the Dispatcher.
        Dispatcher.register(this._handle.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _handle(action) {
        switch(action.actionType) {
            case AT.ADD_NEW_ITEM:
                this._addNewItem(action.payload);
            break;
        }
    }

    // Adds a new item to the list and emits a CHANGED event.
    _addNewItem(item) {
        _state.push(item);
        this.emit(CHANGE);
    }

    // Returns the current store's state.
    getAllItems() {
        return _state;
    }

    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(CHANGE, callback);
    }

    // Removes the listener from the CHANGED event.
    removeChangeListener(callback) {
        this.removeListener(CHANGE, callback);
    }
}

export default new TaskStore();
