import { REGISTER_SUCCESS, REGISTER_FAILURE } from './types';
import axios from 'axios';
import { getUser } from './login';
import { setAlert } from './alert';

//Sends registration data to backend
export const register = (formData) => async dispatch => {
    const body = JSON.stringify(formData);

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('api/users', body, config);
        // console.log(res.data)
        dispatch(registerSuccess(res.data));
        dispatch(getUser(res.data));
        dispatch(setAlert("You're now logged in!", 'success'));
    }
    catch (err) {
        const errorArray = err.response.data.errors;

        if (errorArray) {
            errorArray.forEach((alert) => dispatch(setAlert(alert.msg, 'danger')));
        }

        dispatch(registerFailure(err.response.data))
    }
}

export const registerSuccess = (token) => ({
    type: REGISTER_SUCCESS,
    payload: token
})

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error
})

