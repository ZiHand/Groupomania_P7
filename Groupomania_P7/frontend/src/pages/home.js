import React, { useContext } from 'react';
import { UidContext } from '../components/app_context';
import WhatsNew from './../components/post/whatsNew';

const Home = () => 
{
    const uidCtx    = useContext(UidContext);

    const handleModals = (e) =>
    {
        if (e.target.id === "register")
        {
            window.location = '/signup';
        }
        else if (e.target.id === "login")
        {
            window.location = '/login';
        }
    }

    // ================================
    // Render Logged
    // ================================
    const renderLogged = () => 
    {
        return (
            <WhatsNew />
        );
    }

    // ================================
    // Render UnLogged
    // ================================
    const renderUnLogged = () => 
    {
        return (
            <div className='login_container'>
                <button onClick={handleModals} id="register">S'inscrire</button>
                <br/>
                <button onClick={handleModals} id="login">Se connecter</button>
            </div>
        );
    }

    return (
        <div className='default_page home_page'>
            {uidCtx.uid ? renderLogged() : renderUnLogged()}
        </div>
    );
};

export default Home;