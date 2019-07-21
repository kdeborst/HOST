/* Required Profile Actions & Dependencies */
import axios from 'axios';
import { setAlert } from './alert';
import {
    DISPLAY_DASHBOARD,
    PROFILE_ERROR} 
    from './constances';


/* GET ACCOUNT PROFILE */
export const getAccountProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/user');
        dispatch({
            type: DISPLAY_DASHBOARD,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}