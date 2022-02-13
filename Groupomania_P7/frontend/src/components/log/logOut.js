import React from 'react';
import Axios from 'axios';
import cookie from 'js-cookie';

const LogOut = () => 
{
    const removeCookie = (key) => 
    {
        if (window !== "undefined")
        {
            cookie.remove(key, {expire : 1});
        }
    };

    const logout = async () =>
    {
        await Axios(
        {
            method          : 'get',
            url             : `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials : true
        })
        .then(() => removeCookie('jwt'))
        .catch((err) => console.log(err))

        window.location = "/";
    }

    return (
        <li onClick={logout}>
            <img src='./img/icons/logout.svg' alt='Logo de deconnection' title='Deconnection'/>
        </li>
    );
};

export default LogOut;