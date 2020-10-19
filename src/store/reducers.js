import { ADDCUSTOMUSER, UPDATEMOVIELIST, UPDATEWATCHLIST } from "./actionTypes.js";

const initialState = {
    customUser: {},
    movieList: [],
    watchList: [{description: "A botched robbery...", id: 500, name: "Reservoir Dogs", posterPath: "/AjTtJNumZyUDz33VtMlF1K8JPsE.jpg"},],
    counter: 0
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDCUSTOMUSER:
            return {
                customUser: action.payload
            };
        case UPDATEMOVIELIST:
            return {
                movieList: action.payload
            };
        case UPDATEWATCHLIST:
            return {
                watchList: action.payload
            };
        default:
            return state;
    }
};