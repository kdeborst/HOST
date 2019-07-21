/* Connect Required Data */
import { combineReducers} from 'redux';

/* HOST® Reducers */
import alert from './alert';
import authorisation from './authorisation';
import profile from './profile';

export default combineReducers({
    alert,
    authorisation,
    profile
});