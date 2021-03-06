/* Required Action Constances */
import {
    REGISTRATION_SUCCESS, 
    REGISTRATION_ERROR, 
    ACCOUNT_LOADED, 
    AUTHORISATION_ERROR,
    LOGIN_VERIFIED,
    LOGIN_ERROR,
    LOGOUT } 
    from '../actions/constances';

/* Initialising State */
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
}

export default function(state = initialState, action) {

    /* Destructure(d) Data */
    const { type, payload } = action;

    switch(type) {
        case REGISTRATION_SUCCESS:
        case LOGIN_VERIFIED:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTRATION_ERROR:
        case AUTHORISATION_ERROR:
        case LOGIN_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case ACCOUNT_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        default:
            return state;
    }

}