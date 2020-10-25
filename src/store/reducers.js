import { ADDCUSTOMUSER, UPDATEMOVIELIST } from "./actionTypes.js";

const initialState = {
    customUser: {
        first:  "", 
        last: "", 
        watchListId: ""
    },
    movieList: {},
    WLcounter: 0, 
    counter: 0
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDCUSTOMUSER:
            return {
                customUser: {
                    first :  action.payload.first,
                    last : action.payload.last,
                    watchListId: action.payload.watchListId
                },
                WLcounter: state.WLcounter+1
            };
        case UPDATEMOVIELIST:
            return {counter: state.counter+1};
        default:
            return state;
    }
};