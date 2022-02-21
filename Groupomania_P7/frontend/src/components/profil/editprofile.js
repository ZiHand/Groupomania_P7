import React from "react";
import { useSelector } from "react-redux";
import UdpateProfile from './updateprofile';


const Editprofile = () => 
{
    const userData = useSelector((state) => state.userReducer);

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