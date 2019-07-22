/* Required Dependencies */
import { 
    DISPLAY_DASHBOARD,
    UPDATE_PROFILE, 
    PROFILE_ERROR,
    CLEAR_CREDENTIALS } 
    from "../actions/constances";

/* Initialising State */
const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    
    /* Destructure(d) Data */
    const { type, payload } = action;

    switch(type) {
        case DISPLAY_DASHBOARD:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_CREDENTIALS:
            return {
                ...state,
                profile: null,
                loading: false
            };
        default:
            return {
                state
            };

    }

}