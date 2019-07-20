/* Required Dependencies */
import axios from 'axios';

/* Simple Function To Add Global Header i.o.t. Set Or Delete An Automatically Assigned Webtoken */
const setAuthorisation = token => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthorisation;