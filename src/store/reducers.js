import { ADDCUSTOMUSER, UPDATEMOVIELIST, UPDATEWATCHLIST } from "./actionTypes.js";

const initialState = {
    watchList: [],
    customUser: {
        first:  "",
        last: "",
        watchListId: ""
    },
    movieList: {},
    WLcounter: 0,
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
            state.WLcounter= state.WLcounter+1
            return state;
            //};
        case UPDATEMOVIELIST:
            return {
                movieList: action.payload
            };
        case UPDATEWATCHLIST:
            state.watchList = action.payload;
            return state;
            // return {
            //     watchList: action.payload
            // };
        default:
            return state;
    }
};
