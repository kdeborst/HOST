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
};


/* UPGRADE HOST® PROFILE STATUS */
export const upgradeAccount = (profileData, history, edit=false) => async dispatch => { 
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', profileData, config);
        dispatch({
            type: DISPLAY_DASHBOARD,
            payload: res.data
        });
        dispatch(
            setAlert(edit ? 
                'You Have Successfully Updated Your Profile!' : 
                'You Have Successfully Upgraded Your HOST® Status!',
                'success')
        );

        if(!edit) {
            history.push('/dashboard');
        }

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
} 