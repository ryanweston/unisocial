import { FETCH_UNI_BEGIN, FETCH_UNI_SUCCESS, FETCH_UNI_FAILURE } from '../actions/types';

const initialState = {
    universities: [],
    loading: true,
    error: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_UNI_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_UNI_SUCCESS:
            return {
                ...state,
                universities: [payload.reviews],
                loading: false,
            }
        case FETCH_UNI_FAILURE:
            return {
                ...state,
                error: payload.error
            }
        default:
            return state;
    }
}
