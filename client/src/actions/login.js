import { LOGIN_SUCCESS, LOGIN_FAILURE, GET_USER, LOGOUT_USER, DELETE_USER } from './types';
import { deleteReview } from './dashboard';
import { setAlert } from './alert';
import axios from 'axios';

export const login = (loginInfo) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // console.log('Request made');

    try {
        console.log('Login info before send' + loginInfo);
        const res = await axios.post('/api/auth', loginInfo, config);
        const returned = res.data;
        console.log("Check:" + returned);

        //Frontend check for captcha verification, if true, sets relevant authentication states and retrieves users information
        if (returned[1].success) {
            dispatch(loginSuccess(returned[0]));
            dispatch(getUser());
            dispatch(setAlert("You're now logged in!", 'success'));
        }
    } catch (err) {
        const errorArray = err.response.data.errors;
        console.log(err.errors);
        if (errorArray) {
            errorArray.forEach((alert) => dispatch(setAlert(alert.msg, 'danger')));
        }
    }
}

export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token
})

export const deleteUser = (option) => async dispatch => {
    try {
        //if user has opted to delete their review
        if (option === true) {
            dispatch(deleteReview());
        }
        await axios.delete('/api/auth');
        dispatch(logout());
        dispatch({
            type: DELETE_USER
        })
    } catch (err) {
        console.log(err.response.data);
    }
}


//Sent to recieve the users information, token is sent through headers attached by functon
//that runs constantly during the application session, checking against the token from local storage
//and appending it to every header request to API. 
// @ return -> users: name, email, university
export const getUser = () => async dispatch => {
    try {
        console.log('Getting user');
        const res = await axios.get('/api/auth');
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (err) {
        //Logs user out if user returns as having no authentication or if account no longer
        //exits, account deletion is example.
        dispatch(logout());
    }
}

export const logout = () => dispatch => {
    dispatch(logoutUser());
    dispatch(setAlert("You've been logged out", 'success'))
}

export const logoutUser = () => ({
    type: LOGOUT_USER
})

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