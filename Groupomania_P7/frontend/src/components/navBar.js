import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {NavLink} from "react-router-dom";
import { UidContext } from './app_context';
import LogOut from './log/logOut';

const NavBar = () => 
{
    const uidCtx    = useContext(UidContext);
    const userData  = useSelector((state) => state.userReducer);

    // ================================
    // Render Logged
    // ================================
    const renderLogged = () => 
    {
        return (
            <ul>
                <li></li>
                <li className='welcome'>
                    <NavLink end to='/profil'>
                        <h5>Bienvenue {userData.pseudo}</h5>
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
                    <NavLink end to='/'>
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
                    <NavLink end to='/'>
                        <div className='logo'>
                            <img src='./img/icon-left-font2.png' alt='Logo de Groupomania'/>
                        </div>
                    </NavLink>
                </div>
                {uidCtx.uid ? renderLogged() : renderUnLogged()}
            </div>
        </nav>
    );
};

export default NavBar;