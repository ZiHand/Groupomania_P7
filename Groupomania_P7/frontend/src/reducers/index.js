import { combineReducers } from "redux";
import userReducer from './user_reducer';
import errorReducer from './error_reducer';

// Combine all reducers for the store
export default combineReducers(
{
    userReducer,
    errorReducer,
});