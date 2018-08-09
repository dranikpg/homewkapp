import Dispatcher from '../dispatcher';
import ActionTypes from './const.js';
import AT from "./const";

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

    edit(entry){
        Dispatcher.dispatch({
            actionType:AT.EDIT,
            payload:entry
        });
    }

    newitem(){
        Dispatcher.dispatch({
            actionType:AT.EDIT,
            payload:undefined
        });
    }

}

export default new EditActions();
