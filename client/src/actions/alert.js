/* Required Dependencies For Dispatching Imports */
import { SET_ALERT, REMOVE_ALERT } from './constances';
import uuid from 'uuid';

/* Dispatch Alerts */
export const setAlert = (alertMessage, alertType, timeout = 5000) => dispatch => {

    /* Initialise & Generate Random ID */
    const id = uuid.v4();

    /* Initialise Set Alert */
    dispatch({
        type: SET_ALERT,
        payload: { alertMessage, alertType, id }
    });

    /* Remove Alert From View After 5 Seconds */
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}