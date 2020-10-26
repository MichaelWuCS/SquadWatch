import { ADDCUSTOMUSER, UPDATEMOVIELIST, UPDATEWATCHLIST } from "./actionTypes.js";

export const updateMovieList = () => ({
    type: UPDATEMOVIELIST,
});

export const updateWatchList = () => ({
    type: UPDATEWATCHLIST,
});

export const addCustomUser = () => ({
    type: ADDCUSTOMUSER,
});



