import { combineReducers } from "redux";
import userReducer from './user_reducer';
import errorReducer from './error_reducer';

export default combineReducers(
{
    userReducer,
    errorReducer,
})