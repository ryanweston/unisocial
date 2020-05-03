import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            console.log([...state, payload])
            return [...state, payload];
        case REMOVE_ALERT:
            //returns alerts that dont equal current one, meaning ids that match the payload
            //are removed from the array
            return state.filter(alert => alert.id !== payload)

        default:
            return state;
    }
}