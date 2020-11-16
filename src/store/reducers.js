import { ADDCUSTOMUSER, UPDATERECLIST, UPDATEWATCHLIST } from "./actionTypes.js";

const initialState = {
    watchList: [],
    customUser: {
        first:  "",
        last: "",
        watchListId: ""
    },
    recList: []
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDCUSTOMUSER:
            //return {
            state.customUser={
                first :  action.payload.first,
                last : action.payload.last,
                watchListId: action.payload.watchListId,
            }
            return state;
        case UPDATEWATCHLIST:
            return {
                customUser: state.customUser,
                recList: state.recList,
                watchList: action.payload
            };
        case UPDATERECLIST:
            return {
                customUser: state.customUser,
                watchList: state.movieList,
                recList: action.payload
            };
        default:
            return state;
    }
};
