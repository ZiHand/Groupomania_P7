import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty, validateYoutubeVideo } from './../utils';

const Card = ({post}) => 
{
    const [isLoading, setIsLoading] = useState(true);

    const usersData     = useSelector((state) => state.usersReducer);
    const userData      = useSelector((state) => state.userReducer);
    const dispatch      = useDispatch();

    const avatar_url    = "./uploads/profil/" + userData.avatar_url;
    const pict_url      = "./uploads/post/";

    useEffect(() => 
    {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])

    return (
        <li className="card_container" key={post.id}>
            {
                isLoading ? (
                    <i className="fas fa-spinner fa-spin"/>
                ) : (
                    <>
                        <div className="card_left">
                            <div className="card_img_container">
                                <img src={
                                    !isEmpty(usersData[0]) && 
                                        usersData.map((user) => 
                                        {
                                            // if (user._id === post.userId) return avatar_url;
                                            // else return null;
                                            return avatar_url;
                                        })
                                        .join("")
                                    } alt = "poster-pic" 
                                />
                            </div>
                        </div>
                        <div className="card_right">
                            <div className="card_header">
                                <div className="pseudo">
                                    <h3>
                                    {!isEmpty(usersData[0]) &&
                                    usersData.map((user) => 
                                    {
                                        if (user._id === post.posterId) return user.pseudo;
                                        else return null;
                                    })
                                    .join("")}
                                    </h3>
                                </div>
                                <span>{dateParser(post.createdAt)}</span>
                            </div>
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
                        </div>
                    </>
                )
            }
        </li>
    );
};

export default Card;