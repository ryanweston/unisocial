import { GET_USER_INFO } from './types';
import axios from 'axios';

export const getUserInfo = () => async dispatch => {
    try {
        console.log('Get user information dispatch initiated');
        const res = await axios.get('api/dashboard');
        dispatch({
            type: GET_USER_INFO,
            payload: res.data.user
        })

    } catch (err) {
        console.log(err.response.data)
    }
}
