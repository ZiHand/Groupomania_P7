import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {NavLink} from "react-router-dom";
import { UidContext } from './app_context';
import LogOut from './log/logOut';

const NavBar = () => 
{
    const uidCtx        = useContext(UidContext);
    const userData      = useSelector((state) => state.userReducer);
    const avatar_url    = "./uploads/profil/" + userData.avatar_url;

    // ================================
    // Render Logged
    // ================================
    const renderLogged = () => 
    {
        return (
            <ul>
                <li></li>
                <li className='welcome'>
                    <NavLink to='/profil'>
                        <img className='img_profile_header' src={userData.avatar_url ? avatar_url : "./img/default_avatar2.png"} alt="Avatar utilisateur, profil" title='Profil' />
                    </NavLink>
                </li>
                <LogOut/>
            </ul>
        );
    }

    // ================================
    // Render UnLogged
    // ================================
    const renderUnLogged = () => 
    {
        return (
            <ul>
                <li></li>
                <li>
                    <NavLink to='/login'>
                        <img src='./img/icons/login.svg' alt='Logo de connection' title='Connection'/>
                    </NavLink>
                </li>
            </ul>
        );
    }

    // ================================
    // Main Render
    // ================================
    return (
        <nav>
            <div className='nav_container'>
                <div className='logo'>
                    <NavLink to='/'>
                        <div className='logo'>
                            <img src='./img/logos/icon-left-font@0,25x.png' alt='Logo de Groupomania, acceuil' title='Acceuil'/>
                        </div>
                    </NavLink>
                </div>
                {uidCtx.uid ? renderLogged() : renderUnLogged()}
            </div>
        </nav>
    );
};

export default NavBar;