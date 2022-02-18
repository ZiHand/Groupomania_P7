import React, { useContext } from 'react';
import { UidContext } from '../components/app_context';
import UpdateProfil from "../components/profil/editprofile";

const Profil = () => 
{
    return (
        <div className='default_page profil_page'>
            <UpdateProfil />
        </div>
    );
};

export default Profil;