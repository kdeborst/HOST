import { SET_ALERT, REMOVE_ALERT } from "../actions/constances";

/* Initialising State */
const initialState = [];

export default function(state = initialState, action) {
    /* Destructure(d) Data */
    const { type, payload } = action;
    
    /* Evaluate Type Of Alert */
    switch(type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
};