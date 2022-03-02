import React from "react";
import { useSelector } from "react-redux";
import UdpateProfile from './updateprofile';


const Editprofile = () => 
{
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className='profil_container'>
            <h2> Profile de {userData.pseudo}</h2>
            <div className='update_container'>
                <UdpateProfile />
            </div>           
        </div>
    );
};

export default Editprofile;