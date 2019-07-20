/* Required Action Constances */
import {REGISTRATION_SUCCESS, REGISTRATION_FAIL, ACCOUNT_LOADED, AUTHORISATION_ERROR } from '../actions/constances';

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
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTRATION_FAIL:
        case AUTHORISATION_ERROR:
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