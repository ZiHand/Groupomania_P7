import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, dateParser } from "./utils";
import { addComment } from '../actions/post_actions';
import { getPosts } from './../actions/post_actions';
import EditComment from './post/editComment';


const Comments = ({post}) => 
{    
    const [text, setText] = useState("");

    const usersData   = useSelector((state) => state.usersReducer);
    const userData    = useSelector((state) => state.userReducer);
    const dispatch    = useDispatch();
    const profil_pic  = "./uploads/profil/";

    


    const handleComment = (e) => 
    {
        e.preventDefault();
    
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
          {post.comments.map((comment) => 
          {
            return (
              <div
                className={
                  comment.userId === userData.id
                    ? "comment_container client"
                    : "comment_container"
                }
                key={comment.id}
              >
                <div className="comment_header">
                  <div className='avatar_container'>
                    <img
                      src=
                      {
                        !comment.userId ? "./img/default_avatar2.png" : !isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => 
                          {
                            if (user.id === comment.userId) 
                            {
                              return (user.avatar_url ? profil_pic + user.avatar_url : "./img/default_avatar2.png")
                            }
                            else return null;
                          })
                          .join("")
                      }
                      alt="commenter pic"
                    />
                  </div>
                  <div className="pseudo">
                    <h4>{!comment.userId ? "Anonyme" : !isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => 
                          {
                            if (user.id === comment.userId) 
                            {
                              return user.pseudo;
                            } 
                            else return null;
                          })
                          .join("")
                        }
                    </h4>
                  </div>
                  <span>{dateParser(comment.createdAt)}</span>
                </div>
                <div className="comment_content">
                  <p>{comment.message}</p>
                  {<EditComment comment={comment} postId={post.id} /> }
                  <div className='comment_line'>
                  </div>
                </div>
              </div>
            );
          })}
          {userData.id && (
          <form action="" onSubmit={handleComment} className="comment_form">
              <input
                  type="text"
                  name="text"cd ba
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  placeholder="Laisser un commentaire"
              />
          <input type="submit" value="Envoyer" />
        </form>
      )}
        </div>
    );
};

export default Comments;