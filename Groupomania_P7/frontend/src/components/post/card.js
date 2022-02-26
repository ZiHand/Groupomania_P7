import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateParser, isEmpty, validateYoutubeVideo } from './../utils';
import Comments from './../comments';
import DeleteCard from './deleteCard';
import { updatePost } from '../../actions/post_actions';

const Card = ({post}) => 
{
    const [isLoading, setIsLoading]         = useState(true);
    const [isUpdated, setIsUpdated]         = useState(false);
    const [textUpdate, setTextUpdate]       = useState(null);
    const [showComments, setShowComments]   = useState(false);

    const dispatch      = useDispatch();
    const usersData     = useSelector((state) => state.usersReducer);
    const userData      = useSelector((state) => state.userReducer);
    const profil_pic    = "./uploads/profil/";
    const pict_url      = "./uploads/post/";

    // ================================
    // editPost
    // ================================
    const editPost = () => 
    {
        if (textUpdate) 
        {
            dispatch(updatePost(post.id, textUpdate));
        }
        setIsUpdated(false);
    }

    // ================================
    // useEffect
    // ================================
    useEffect(() => 
    {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])

    // ================================
    // cardleftRender
    // ================================
    const cardLeftRender = () => 
    {
        return (
            <div className="card_left">
                <div className="card_img_container">
                    <img src={
                        !isEmpty(usersData[0]) && 
                            usersData.map((user) => 
                            {
                                if (user.id === post.userId) return profil_pic + user.avatar_url;
                                else return null;
                            })
                            .join("")
                        } alt = "poster-pic" 
                    />
                </div>
            </div>
        );
    }

    // ================================
    // cardRightRender
    // ================================
    const cardRightRender = () => 
    {
        return (
            <div className="card_right">
                {headerRender()}
                {contentRender()}
                {footerRender()}
            </div>
        );
    }

    // ================================
    // headerRender
    // ================================
    const headerRender = () => 
    {
        return (
            <div className="card_header">
                <div className="pseudo">
                    <h3>
                    {!isEmpty(usersData[0]) &&
                    usersData.map((user) => 
                    {
                        if (user.id === post.userId) return user.pseudo;
                        else return null;
                    })
                    .join("")}
                    </h3>
                </div>
                <span>{dateParser(post.createdAt)}</span>
            </div>
        );
    }

    // ================================
    // contentRender
    // ================================
    const contentRender = () => 
    {
        return (
            <>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update_post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button_container">
                  <button className="btn" onClick={editPost}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            <div className="post_content">
                {post.picture && <img src={pict_url + post.picture} alt="card-pic" className="card_pic"/>}
                {post.video && (
                    <iframe
                        width="500"
                        height="300"
                        src={validateYoutubeVideo(post.video)}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post.id}
                    >
                    </iframe>
                    )
                }
            </div>
            </>
        );
    }

    // ================================
    // footerRender
    // ================================
    const footerRender = () => 
    {
        return (
            <>
            <div className="card_footer">
                <div className="edit_container">
                    <div className="edit_icon"> {userData.id === post.userId && (
                        <img
                        onClick={() => setIsUpdated(!isUpdated)}
                        src="./img/icons/edit.svg"
                        alt="editer"
                        title="Editer"
                        />
                    )}
                    </div>
                    <div className="delete_icon"> {userData.id === post.userId && (
                        <DeleteCard id={post.id} />
                    )}
                    </div>
                    <div className="comment_icon">
                        <img
                        onClick={() => setShowComments(!showComments)}
                        src="./img/icons/message1.svg"
                        alt="commentaires"
                        title="Voir les commentaires"
                        />
                    </div>
                    <span>{post.comments.length}</span>
                </div>
                {showComments && <Comments post={post} />}
            </div>
            </>
        );
    }

    // ================================
    // Main Render
    // ================================
    return (
        <li className="card_container" key={post.id}>
            {
                isLoading ? (
                    <i className="fas fa-spinner fa-spin"/>
                ) : (
                    <>
                        {cardLeftRender()}
                        {cardRightRender()}
                    </>
                )
            }
        </li>
    );
};

export default Card;