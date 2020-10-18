import { createStore } from "redux";
import { mainReducer } from "./reducers.js";

export const store = createStore(mainReducer);