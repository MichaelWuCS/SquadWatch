import { ADDCUSTOMUSER, UPDATERECLIST, UPDATEWATCHLIST } from "./actionTypes.js";

export const updateRecList = () => ({
    type: UPDATERECLIST,
});

export const updateWatchList = () => ({
    type: UPDATEWATCHLIST,
});

export const addCustomUser = () => ({
    type: ADDCUSTOMUSER,
});

