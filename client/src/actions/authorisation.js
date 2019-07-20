/* Required Authorisation Actions & Dependencies */
import axios from 'axios';
import { setAlert } from './alert';
import { REGISTRATION_SUCCESS, REGISTRATION_FAIL, ACCOUNT_LOADED, AUTHORISATION_ERROR } from './constances';
import setAuthorisation from '../helpers/setAuthorisation';

/* Load Users' Account */
export const loadAccount = () => async dispatch => {
    
    /* Grab Token from Header IF it exists */
    if(localStorage.token) {
        setAuthorisation(localStorage.token);
    }

    /* API Request */
    try {
        const res = await axios.get('/api/authentication');
        dispatch({
            type: ACCOUNT_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTHORISATION_ERROR
        });
    }
};

/* Register New User */
export const register = ({ name, email, password }) => async dispatch => {
    
    /* Initialising Header */
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    /* Prepare Data To Be Send */
    const body = JSON.stringify({ 
        name,
        email, 
        password 
    });

    /* Send Registration Data */
    try {
        const res = await axios.post(
            'api/user', 
            body, 
            config
        );
        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTRATION_FAIL
        });
    }
}