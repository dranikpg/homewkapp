import Dispatcher from '../dispatcher';
import ActionTypes from './const.js';

class ListActions {

   constructor() {
   }

   addNew(item) {
        // Note: This is usually a good place to do API calls.
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_NEW_ITEM,
            payload: item
        });
    }

}

export default new ListActions();
