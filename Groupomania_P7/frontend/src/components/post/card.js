import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty, validateYoutubeVideo } from './../utils';
import CommentCard from './card_comments';
import Comments from './../comments';

const Card = ({post}) => 
{
    const [isLoading, setIsLoading]         = useState(true);
    const [showComments, setShowComments]   = useState(false);

    const usersData     = useSelector((state) => state.usersReducer);
    const postData      = useSelector((state) => state.postReducer);
    const profil_pic    = "./uploads/profil/";
    const pict_url      = "./uploads/post/";

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
            <p>{post.message}</p>
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
                    <div className="comment_icon">
                        <img
                        onClick={() => setShowComments(!showComments)}
                        src="./img/icons/message1.svg"
                        alt="commentaires"
                        title="Voir les commentaires"
                        />
                    </div>
                    <span>{!isEmpty(postData[0]) && postData[0].comments.length}</span>
                </div>
                {showComments && <Comments post={post} key={post.id} />}
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