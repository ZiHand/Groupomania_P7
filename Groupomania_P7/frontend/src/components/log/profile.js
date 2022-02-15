import React from 'react';

const Profile = () => 
{
    const profile = async () =>
    {
        window.location = "/profil";
    }

    return (
        <li onClick={profile}>
            <img src='./img/icons/gear.svg' alt='Logo de profil' title='Profil'/>
        </li>
    );
};

export default Profile;