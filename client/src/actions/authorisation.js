/* Required Authorisation Actions & Dependencies */
import axios from 'axios';
import { setAlert } from './alert';
import { 
    REGISTRATION_SUCCESS, 
    REGISTRATION_ERROR, 
    ACCOUNT_LOADED, 
    AUTHORISATION_ERROR, 
    LOGIN_VERIFIED, 
    LOGIN_ERROR,
    LOGOUT } 
    from './constances';
import setAuthorisation from '../helpers/setAuthorisation';


/* LOAD USERS' TOKEN */
export const loadAccount = () => async dispatch => {
    
    /* Grab Token from Header IF EXISTS */
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


/* ACCOUNT LOGIN */
export const login = (email, password) => async dispatch => {
    
    /* Initialising Header */
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    /* Prepare Data To Be Send */
    const body = JSON.stringify({ 
        email, 
        password 
    });

    /* Send Login Data For Verification */
    try {
        const res = await axios.post('/api/authentication', body, config);
        dispatch({
            type: LOGIN_VERIFIED,
            payload: res.data
        });
        dispatch(loadAccount());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_ERROR
        });
    }
}


/* CLEAR PROFILE & LOGOUT ACCOUNT */
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
     });
}


/* NEW ACCOUNT REGISTRATION */
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
        const res = await axios.post('/api/user', body, config);
        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data
        });
        dispatch(loadAccount());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTRATION_ERROR
        });
    }
}