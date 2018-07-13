import Dispatcher from '../dispatcher';
import AT from './const.js';

class UserActions {

   constructor() {
   }

   startupAuth(){
     Dispatcher.dispatch({
         actionType: AT.ST_AUTH
     });
   }

   login(namep, pwp){
      Dispatcher.dispatch({
        actionType:AT.AUTH,
        payload:{
            name:namep,
            pw:pwp
        }
      })
   }

}

export default new UserActions();
