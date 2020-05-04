import { REGISTER_SUCCESS, REGISTER_FAILURE } from './types';
import axios from 'axios';

export const register = async (formData) => {
    const body = JSON.stringify(formData);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('api/user', config, body);
        console.log(res.data)
        dispatch(registerSuccess(res.data));
    }
    catch (err) {
        console.log(err.response.data)
        dispatch(registerFailure(err.response.data))
    }
}

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: { user }
})

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: { error }
})