import Dispatcher from '../dispatcher';
import ActionTypes from './const.js';

class ListActions {

   constructor() {
   }

   load() {
        // Note: This is usually a good place to do API calls.
        Dispatcher.dispatch({
            actionType: ActionTypes.LOAD_TS,
        });
    }

}

export default new ListActions();
