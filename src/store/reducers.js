import { ADDCUSTOMUSER, UPDATEMOVIELIST } from "./actionTypes.js";

const initialState = {
    customUser: {},
    movieList: {},
    counter: 0
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDCUSTOMUSER:
            return {customUser: action.payload};
        case UPDATEMOVIELIST:
            return {counter: state.counter+1};
        default:
            return state;
    }
};