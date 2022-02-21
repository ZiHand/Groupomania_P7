import React, { useState } from "react";
import { useSelector } from "react-redux";
import UploadImg from "./uploadImg";
import UdpateProfile from './updateprofile';


const Editprofile = () => 
{
    const userData      = useSelector((state) => state.userReducer);
    const error         = useSelector((state) => state.errorReducer.userError);
    const avatar_url    = "./uploads/profil/" + userData.avatar_url;

    return (
        <div className='profil_container'>
            <h1> Profile de {userData.pseudo}</h1>
            <div className='update_container'>
                <br/>
                <UdpateProfile />
            </div>           
        </div>
    );
};

export default Editprofile;