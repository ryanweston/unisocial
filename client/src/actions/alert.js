import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

//Takes in the message, most likely dispatched from another action that passes in the JSON 
//error message sent from the server routes.
export const setAlert = (msg, alertType) => dispatch => {
    //UUID will generate a random ID number for each error that is generated.
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })
    //After 2 seconds run actiont to remove alert
    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), 2000)
};
