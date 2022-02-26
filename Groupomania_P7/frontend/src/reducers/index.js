import { combineReducers } from "redux";
import userReducer from './user_reducer';
import usersReducer from './users_reducer';
import errorReducer from './error_reducer';
import postReducer from './post_reducer';
import commentReducer from './comment_reducer';

// Combine all reducers for the store
export default combineReducers(
{
    userReducer,
    usersReducer,
    errorReducer,
    postReducer,
    commentReducer
});