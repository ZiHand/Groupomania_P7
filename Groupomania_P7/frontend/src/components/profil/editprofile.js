import React, { useState } from "react";
import { useSelector } from "react-redux";
import UploadImg from "./uploadImg";


const Editprofile = () => 
{
    const userData      = useSelector((state) => state.userReducer);
    const error         = useSelector((state) => state.errorReducer.userError);
    const avatar_url    = "./uploads/profil/" + userData.avatar_url;

    return (
        <div className='profil_container'>
            <h1> Profile de {userData.pseudo}</h1>
            <div className='update_container'>
                <h3>Photo de Profil</h3>
                <div className='img_container'>
                    <img src={userData.avatar_url ? avatar_url : "./img/default_avatar2.png"} alt="Avatar utilisateur" />  
                </div>
                <UploadImg />
                <p>{error.maxSize}</p>
                <p>{error.format}</p>
            </div>           
        </div>
    );
};

export default Editprofile;