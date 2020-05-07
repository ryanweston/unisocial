import { LOGIN_SUCCESS, LOGIN_FAILURE, GET_USER, LOGOUT_USER } from './types';
import axios from 'axios';

export const login = (loginInfo) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log('Request made');

    try {
        console.log('Login info before send' + loginInfo);
        const res = await axios.post('/api/auth', loginInfo, config);
        const returned = res.data;
        console.log(returned);
        if (returned.success) {
            dispatch(loginSuccess(returned));
            dispatch(getUser());
        }
    } catch (err) {
        dispatch(loginFailure(err));
    }
}

export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token
})

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
})


//Sent to recieve the users information, token is sent through headers attached by functon
//that runs constantly during the application session, checking against the token from local storage
//and appending it to every header request to API. 
// @ return -> users: name, email, university
export const getUser = () => async dispatch => {
    try {
        console.log('Getting user')
        const res = await axios.get('/api/auth');
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (err) {
        console.log(err.response.data)
    }
}


//Sets authentication token pushed into state through login/register (occurs in store) to headers, 
//enabling requests to private routes with auth middleware
export const setHeader = (token) => {
    if (token) {
        console.log('Header set with: ' + token);
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else if (!token) {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
}

export const logout = () => dispatch => {
    dispatch(logoutUser());
    console.log('initiating dispatch');
}

export const logoutUser = () => ({
    type: LOGOUT_USER
})