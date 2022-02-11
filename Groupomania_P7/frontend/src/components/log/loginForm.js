import React, { useState } from "react";
import Axios from "axios";

const LoginForm = () => 
{
    // ================================
    // Hooks
    // ================================
    const [email, setEmail]         = useState("");
    const [password, setPassword]   = useState("");

    // ================================
    // Logic
    // ================================
    const handleLogin = (event) =>
    {
        const emailError    = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");

        Axios(
        {
            method          : "post",
            url             : `http://localhost:8080/api/user/login`,
            withCredentials : true,
            data            : {email, password},
        })
            .then((res) => 
            {
                if (res.data.errors)
                {
                    emailError.innerHTML    = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                }
                else
                {
                    // Retour a l'acceuil, nous sommes connecté.
                    emailError.innerHTML    = "";
                    passwordError.innerHTML = "";
                    window.location = '/';
                }
            })
            .catch((err) => 
            {
                console.log(err);
            });

        // Put it at the end !!
        event.preventDefault();
    };

    // ================================
    // Generate
    // ================================
    return (
        <form action="" onSubmit={handleLogin} id="sign_up_form">
            <label htmlFor="email">Email</label>
            <br/>
            <input 
                type="text" 
                name="email" 
                id="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
            />
            <div className="email error"></div>
            <br/>
            <label htmlFor="password">Mot de passe</label>
            <br/>
            <input 
                type="password" 
                name="password" 
                id="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
            />
            <div className="password error"></div>
            <br/>
            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default LoginForm;