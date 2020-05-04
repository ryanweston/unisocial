import { REGISTER_SUCCESS, REGISTER_FAILURE } from './types';
import axios from 'axios';

export const register = (formData) => async dispatch => {
    const body = JSON.stringify(formData);

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('api/users', body, config);
        console.log(res.data)
        dispatch(registerSuccess(res.data));
    }
    catch (err) {
        console.log(err.response.data)
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

export const loginUser = (userDetails) => {

}

// export const getUser = 