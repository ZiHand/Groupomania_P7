import React, { useState } from 'react';
import Axios from 'axios';

const LoginForm = () => 
{
    // ================================
    // Hooks
    // ================================
    const [email, setEmail]         = useState('');
    const [password, setPassword]   = useState('');

    // ================================
    // Logic
    // ================================
    const handleLogin = (e) =>
    {
        
    }

    // ================================
    // Generate
    // ================================
    return (
        <form action='' onSubmit={handleLogin} id='sign_up_form'>
            <label htmlFor='email'>Email</label>
            <br/>
            <input type='text' name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            <div className='email error'></div>
            <br/>
            <label htmlFor='password'>Mot de passe</label>
            <br/>
            <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            <div className='password error'></div>
            <br/>
            <input type="submit" value='Se connecter'/>
        </form>
    );
};

export default LoginForm;