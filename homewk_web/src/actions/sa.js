import Dispatcher from '../dispatcher';
import AT from './const.js';

class StateActions {

   constructor() {
   }

   _DEV_base(){
     Dispatcher.dispatch({
       actionType:AT._DEV_BASE,
     });
   }

   edit(entry){
      Dispatcher.dispatch({
        actionType:AT.EDIT_VW,
        payload:entry
      });
   }

   newitem(){
      Dispatcher.dispatch({
        actionType:AT.EDIT_VW,
        payload:undefined
      });
   }

}

export default new StateActions();
