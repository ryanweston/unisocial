import { REGISER_SUCCESS, REGISTER_FAILURE } from '../actions/';

const initialState = [];

export default function (state = initialState, actions) {
    const { type, payload } = actions;
    switch (type) {
        case REGISTER_FAILURE:
            return {

            }
    }
}