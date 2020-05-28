import { GET_USER_INFO, POST_SUCCESS, POST_BEGIN, DELETE_REVIEW, EDIT_BEGIN, EDIT_SUCCESS, CLEAR_SUBMISSION } from './types';
import axios from 'axios';
import { setAlert } from './alert';

//Returns user information & review for dashboard
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

//Scores submission
export const postReview = (scores) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { scores };

    var status = "success";

    //Checks for values of null by looping through each value, responds with alert
    //and prevents POST method with failure variable if null is present.
    //TODO: More secure to make use of promise alls as this method may be invoking race conditions.
    let checkObject = body.scores;

    for (var key of Object.keys(checkObject)) {
        if (checkObject[key] === null) {
            status = "failure";
            dispatch(setAlert("Please fill in all values!", 'danger'));
            console.log(checkObject[key]);
            //Breaks for loop early
            break;
        }
    }

    if (status !== "failure") {
        try {
            dispatch(postBegin());
            console.log(body);
            const res = await axios.post('api/reviews', body, config);
            console.log(res.data);
            dispatch(postSuccess(res.data));
            dispatch(setAlert("Review has been submitted!", 'success'));
        } catch (err) {
            const errorArray = err.response.data.errors;
            if (errorArray) {
                errorArray.forEach((alert) => dispatch(setAlert(alert.msg, 'danger')));
            }
        }
    }
}

export const postBegin = () => ({
    type: POST_BEGIN,
})

export const postSuccess = (response) => ({
    type: POST_SUCCESS,
    payload: response
})

//Edit review
export const editReview = (scores) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { scores };

    var status = "success";

    //Checks for values of null by looping through each value, responds with alert
    //and prevents PUT method with failure variable if null is present.
    //TODO: More secure to make use of promise alls as this method may be invoking race conditions.
    let checkObject = body.scores;

    for (var key of Object.keys(checkObject)) {
        if (checkObject[key] === null) {
            status = "failure";
            dispatch(setAlert("Please fill in all values!", 'danger'));
            // console.log(checkObject[key]);
            //Breaks for loop early
            break;
        }
    }

    if (status !== "failure") {
        try {
            dispatch(editBegin());
            // console.log(body);
            const res = await axios.put('api/reviews', body, config);
            // console.log(res.data);
            dispatch(editSuccess(res.data));
            dispatch(setAlert("Review has been submitted!", 'success'));
            //Clears the submission success, allowing access to edit review soon after posting
            //Needed as success state dictates access and redirects from submission and edit routes
            setTimeout(() => dispatch({
                type: CLEAR_SUBMISSION,
            }), 2000)
        } catch (err) {
            const errorArray = err.response.data.errors;
            if (errorArray) {
                errorArray.forEach((alert) => dispatch(setAlert(alert.msg, 'danger')));
            }
        }
    }
}

export const editBegin = () => ({
    type: EDIT_BEGIN,
})

export const editSuccess = (response) => ({
    type: EDIT_SUCCESS,
    payload: response
})

//Review deletion
export const deleteReview = () => async dispatch => {
    try {
        await axios.delete('/api/reviews');
        dispatch({
            type: DELETE_REVIEW,
        });
        dispatch(setAlert("Review deleted", 'success'));
    } catch (err) {
        // console.log(err.response.data.errors);
    }
}