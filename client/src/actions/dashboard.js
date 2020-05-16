import { GET_USER_INFO, POST_SUCCESS, POST_FAILURE, POST_BEGIN, DELETE_REVIEW } from './types';
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
    }
}

export const postReview = (scores) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = { scores };
    try {
        dispatch(postBegin());
        console.log(body);
        const res = await axios.post('api/reviews', body, config);
        console.log(res.data);
        dispatch(postSuccess(res.data));
    } catch (err) {
        console.log(err.response.data.errors);
        dispatch(postFailure(err.response.data.errors));
    }
}

export const postBegin = () => ({
    type: POST_BEGIN,
})

export const postSuccess = (response) => ({
    type: POST_SUCCESS,
    payload: response
})

export const postFailure = (error) => ({
    type: POST_FAILURE,
    payload: error
})


export const deleteReview = () => async dispatch => {
    try {
        await axios.delete('/api/reviews');
        dispatch({
            type: DELETE_REVIEW,
        });
        console.log('Review deleted');
    } catch (err) {
        console.log(err.response.data.errors);
    }
}