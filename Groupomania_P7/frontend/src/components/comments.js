import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcomments } from './../actions/comment_actions';
import { isEmpty } from './utils';
import CommentCard from './post/card_comments';

const Comments = ({post}) => 
{    
    const [loadComments, setLoadComments]   = useState(true);

    const comments  = useSelector((state) => state.commentReducer);
    const dispatch  = useDispatch();

    // ================================
    // useEffect
    // ================================
    useEffect(() => 
    {
        if (loadComments)
        {
            dispatch(getcomments(post.id));
            setLoadComments(false);
        }
    }, [loadComments, dispatch, post])


    // ================================
    // Main Render
    // ================================
    return (
        <div className='comments_container'>
            {!isEmpty(comments[0]) && 
                <span>{comments.length}</span>
            }
            <ul>
                {!isEmpty(comments[0]) &&
                comments.map((comment) => 
                {
                    return <CommentCard comment={comment} key={comment.id} />;
                })}
            </ul>
        </div>
    );
};

export default Comments;