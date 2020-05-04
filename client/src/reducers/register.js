import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function (state = initialState, actions) {
    const { type, payload } = actions;

    switch (type) {
        case REGISTER_FAILURE:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            }
        case REGISTER_SUCCESS:
            console.log(payload.token);
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        default:
            return state;
    }
}