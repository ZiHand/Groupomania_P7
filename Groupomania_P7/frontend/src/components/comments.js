import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from './utils';
import { addComment } from '../actions/post_actions';
import { getPosts } from './../actions/post_actions';

const Comments = ({post}) => 
{    
    const [text, setText] = useState("");

    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComment = (e) => 
    {
        e.preventDefault();

        console.log(post.id);
        console.log(userData.id);
        console.log(userData.pseudo);
    
        if (text) 
        {
          dispatch(addComment(post.id, userData.id, text))
            .then(() => dispatch(getPosts()))
            .then(() => setText(''));
        }
      };


    // ================================
    // Main Render
    // ================================
    return (
        <div className='comments_container'>
            {userData.id && (
            <form action="" onSubmit={handleComment} className="comment_form">
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder="Laisser un commentaire"
                />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
        </div>
    );
};

export default Comments;