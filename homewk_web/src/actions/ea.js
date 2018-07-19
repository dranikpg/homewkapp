import Dispatcher from '../dispatcher';
import ActionTypes from './const.js';

class EditActions {

   constructor() {
   }

   delete_msg(id){
     Dispatcher.dispatch({
         actionType: ActionTypes.DELETE_MSG,
         payload:id
     });
   }

   add_msg(desc){
     console.log("create action dispatch")
     Dispatcher.dispatch({
         actionType: ActionTypes.CREATE_MSG,
         payload:desc
     });
   }

}

export default new EditActions();
