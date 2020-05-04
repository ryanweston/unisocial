import { combineReducers } from 'redux';
import register from './register';
import alert from './alert';
import uniFetch from './fetchUniversity';


export default combineReducers({
    register,
    alert,
    uniFetch
});