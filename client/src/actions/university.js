import axios from 'axios';
import { FETCH_UNI_BEGIN, FETCH_UNI_SUCCESS, FETCH_UNI_FAILURE } from './types';

export const fetchUni = dispatch => {
    return dispatch => {

        dispatch(fetchUniBegin());

        return axios.get('api/reviews')
            .then(res => {
                dispatch(fetchUniSuccess(res.data.reviews));
                console.log('Successfully fetched reviews.');
            })
            .catch(error => console.log(error));
    };
}


//Parenthases to tell javascript you're returning an object
export const fetchUniBegin = () => ({
    type: FETCH_UNI_BEGIN,
});

export const fetchUniSuccess = reviews => ({
    type: FETCH_UNI_SUCCESS,
    payload: { reviews }
});


export const fetchUniFailure = error => ({
    type: FETCH_UNI_FAILURE,
    payload: { error }
});