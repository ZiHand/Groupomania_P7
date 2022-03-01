import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { isEmpty, validateYoutubeVideo } from './../utils';
import { getPosts, addPost } from '../../actions/post_actions';

const WhatsNew = () => 
{
    // ================================
    // Hooks
    // ================================
    const [message, setMessage]             = useState("");
    const [postPicture, setPostPicture]     = useState(null);
    const [video, setVideo]                 = useState("");
    const [file, setFile]                   = useState();
    const dispatch                          = useDispatch();
    const userData                          = useSelector((state) => state.userReducer);
    const error                             = useSelector((state) => state.errorReducer.postError);

    // ================================
    // Logic
    // ================================
    const handlePost =  () => 
    {
        if (message || postPicture || video) 
        {
            const data = new FormData();
            data.append('message', message);
            data.append('picture', postPicture);
        
            if (file) data.append("file", file);
            data.append('video', video);
            
            dispatch(addPost(userData.id, data));
            
            cancelPost();
            dispatch(getPosts());
        } 
        else 
        {
            alert("Veuillez entrer un message")
        }
    };

    // ================================
    const handlePicture = (e) => 
    {
        console.log("handlePicture");
        console.log(e.target.files[0]);
        setPostPicture(e.target.files[0].name);
        setFile(e.target.files[0]);
        setVideo('');
    }; 
    
    // ================================
    const cancelPost = () => 
    {
        setMessage("");
        setPostPicture("");
        setVideo("");
        setFile("");
    };

    // ================================
    // useEffect
    // ================================
    useEffect(() => 
    {
        const handleVideo = () => 
        {
            let findLink = message.split(" ");
            
            for (let i = 0; i < findLink.length; i++) 
            {    
                if (findLink[i].includes("https://www.yout") || findLink[i].includes("https://yout")) 
                {
                    let embed = validateYoutubeVideo(findLink[i]);
                    setVideo(embed);
                    findLink.splice(i, 1);
                    
                    setPostPicture('');
                }
            }
        };

        handleVideo();

      }, [userData, message, video]);

    // ================================
    return (
        <div className='newpost_container'>
            <div className='new_post_main_container'>
                <textarea
                    name="message"
                    id="message"
                    placeholder= {`Quoi de neuf ${userData.pseudo}?`}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <div className='newpost_footer'>
                    <div className="icon">
                        {isEmpty(video) && (
                        <>
                            <img src="./img/icons/picture.svg" alt="img" />
                            <input
                            type="file"
                            id="file-upload"
                            name="file"
                            accept=".jpg, .jpeg, .png, .gif"
                            onChange={(e) => handlePicture(e)}
                            />
                        </>
                        )}
                        {/*video && (
                            <button onClick={() => setVideo("")}>Supprimer la video</button>
                        )*/}
                    </div>
                    <div className="btn_send">
                        {message || postPicture || video.length > 20 ? (
                            <button className="cancel" onClick={cancelPost}>
                                Annuler
                            </button>
                        ) : null}
                        <button className="send" onClick={handlePost}>
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatsNew;