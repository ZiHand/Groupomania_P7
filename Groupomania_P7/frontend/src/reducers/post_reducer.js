
import { DELETE_POST, GET_POSTS, UPDATE_POST, DELETE_COMMENT } from './../actions/post_actions';

const initialState = {};

export default function postReducer(state = initialState, action)
{
    switch (action.type) 
    {
        case GET_POSTS:
            return action.payload;

        case UPDATE_POST:
            return state.map((post) => 
            {
                if (post.id === action.payload.postId) 
                {
                    return {...post, message: action.payload.message,};
                } 
                else return post;
            });

        case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.postId);

        case DELETE_COMMENT:
            return state.map((post) => 
            {
                console.log(post.comments);
                if (post.id === action.payload.postId) 
                {
                  return {
                    ...post,
                    comments: post.comments.filter(
                      (comment) => comment.id !== action.payload.commentId
                    ),
                  };
                } 
                else return post;
            });


        default: 
            return state;
    }
}