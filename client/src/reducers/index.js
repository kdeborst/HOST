/* Connect Required Data */
import { combineReducers} from 'redux';
import alert from './alert';
import authorisation from './authorisation';

export default combineReducers({
    alert,
    authorisation
});