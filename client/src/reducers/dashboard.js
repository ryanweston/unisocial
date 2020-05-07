import { GET_USER_INFO } from '../actions/types';

const initialState = {
    email: null,
    university: null,
    review: {},
    loading: true,
}

export default function (state = initialState, actions) {
    const { type, payload } = actions;

    switch (type) {
        case GET_USER_INFO:
            return {
                email: payload.email,
                university: payload.userUniversity.name,
                review: payload.review.scores[0],
                loading: false
            }
        default:
            return state
    }
}
