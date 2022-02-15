import React, { useState } from 'react';
import SigninForm from './signupForm';
import LoginForm from './loginForm';


const Log = (props) => 
{
    // ================================
    // Hooks
    // ================================
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    // ================================
    // Logic
    // ================================
    const handleModals = (e) =>
    {
        if (e.target.id === "register")
        {
            setSignInModal(false);
            setSignUpModal(true);
        }
        else if (e.target.id === "login")
        {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }

    // ================================
    // Generate
    // ================================
    return (
        <div className='connection_form'>
            <div className='form_container'>
                {/* <ul>
                    <li onClick={handleModals} id="register">S'inscrire</li>
                    <li onClick={handleModals} id="login">Se connecter</li>
                </ul> */}
                {signUpModal && <SigninForm/>}
                {signInModal && <LoginForm/>}
            </div>
        </div>
    );
};

export default Log;