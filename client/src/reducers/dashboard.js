import {
    GET_USER_INFO,
    POST_BEGIN,
    POST_SUCCESS,
    POST_FAILURE,
    DELETE_REVIEW
} from '../actions/types';

const initialState = {
    email: null,
    university: null,
    review: null,
    loading: true,
    submission: {
        loading: false,
        success: null,
        error: null,
    }
}

export default function (state = initialState, actions) {
    const { type, payload } = actions;

    switch (type) {
        case GET_USER_INFO:
            return {
                ...state,
                email: payload.email,
                university: payload.userUniversity.name,
                review: payload.review,
                loading: false
            }
        case POST_BEGIN:
            return {
                ...state,
                submission: {
                    loading: true,
                }
            }
        case POST_SUCCESS:
            return {
                ...state,
                submission: {
                    loading: false,
                    success: true,
                }
            }
        case POST_FAILURE:
            return {
                ...state,
                submission: {
                    loading: false,
                    success: false,
                    error: payload.error
                }
            }
        case DELETE_REVIEW:
            return {
                ...state,
                review: false,
                loading: false,
                submission: {
                    loading: false,
                    success: false,
                }
            }
        default:
            return state
    }
}
