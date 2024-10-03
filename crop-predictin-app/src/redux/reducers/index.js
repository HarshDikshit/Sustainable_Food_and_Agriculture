import { combineReducers } from "redux";
import itemsReducer from './itemsReducer.js'

const rootReducer = combineReducers({
    items: itemsReducer
});

export default rootReducer;