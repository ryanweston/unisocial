import { LOGIN_SUCCESS, LOGIN_FAILURE } from './types';
import axios from 'axios';

export const login = ({ email, password }) => async dispatch => {
    const body = {
        email,
        password,
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/auth', body, config);
        const returned = res.data;
        dispatch(loginSuccess(returned));
    } catch (err) {
        console.log(err);
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