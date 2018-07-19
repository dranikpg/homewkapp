import Dispatcher from '../dispatcher';
import ActionTypes from './const.js';

class LoadActions {

   constructor() {
   }

   load() {
        // Note: This is usually a good place to do API calls.
        Dispatcher.dispatch({
            actionType: ActionTypes.LOAD_TS,
        });
    }

    reloadmsg(){
        Dispatcher.dispatch({
            actionType: ActionTypes.LOAD_MSG,
        });
    }

}

export default new LoadActions();
