import { combineReducers } from 'redux';
import alert from './alert';
import uniFetch from './fetchUniversity';


export default combineReducers({
    alert,
    uniFetch
});