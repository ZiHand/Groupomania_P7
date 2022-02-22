import React from 'react';
import { useDispatch, useSelector } from "react-redux";

const WhatsNew = () => 
{
    // ================================
    // Hooks
    // ================================
    const userData      = useSelector((state) => state.userReducer);
    //const useDispatch   = useDispatch();

    // ================================
    // Logic
    // ================================
    const handleUpdate = (e) => 
    {
    }

    const avatar_url    = "./uploads/profil/" + userData.avatar_url;

    return (
        <div className='newpost_container'>
            <div className='new_post_left_container'>
                <img src={userData.avatar_url ? avatar_url : "./img/default_avatar2.png"} alt="Avatar utilisateur" title="Changer d'image" />  
            </div>

            <div className='new_post_main_container'>
                <form action="" onSubmit={handleUpdate} className="send_post_form">
                    <input 
                        type="text" 
                        name="post_text" 
                        id="post_text"
                        className='post_text'
                    />
                    <input type="submit" value="Envoyer" className="send_post"/>
                </form>
            </div>
        </div>
    );
};

export default WhatsNew;