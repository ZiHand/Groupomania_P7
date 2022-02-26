import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from './utils';
import { addComment } from '../actions/post_actions';
import { getPosts } from './../actions/post_actions';

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
                      src={
                        !isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => {
                            if (user.id === comment.userId) 
                            {
                              return profil_pic + user.avatar_url;
                            }
                            else return null;
                          })
                          .join("")
                      }
                      alt="commenter pic"
                    />
                  </div>
                </div>
                <div className="comment_content">
                  <div className="comment_header">
                    <div className="pseudo">
                      <h3>{comment.commenterPseudo}</h3>
                      {/*comment.commenterId !== userData._id && (
                        <FollowHandler
                          idToFollow={comment.commenterId}
                          type={"card"}
                        />
                      )*/}
                    </div>
                    <span>{/*timestampParser(comment.timestamp)*/}</span>
                  </div>
                  <p>{comment.message}</p>
                    {/* <EditDeleteComment comment={comment} postId={post._id} /> */}
                </div>
              </div>
            );
          })}
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