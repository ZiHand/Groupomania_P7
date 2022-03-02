import React from 'react';
import Axios from "axios";
import { useState } from 'react';
import LoginForm from './loginForm';

const SigninForm = () => 
{
    // ================================
    // Hooks
    // ================================
    const [formSubmit, setFormSubmit]           = useState(false);
    const [pseudo, setPseudo]                   = useState("");
    const [email, setEmail]                     = useState("");
    const [password, setPassword]               = useState("");
    const [controlPassword, setControlPassword] = useState("");

    // ================================
    // Logic
    // ================================
    const handleRegister = async (event) =>
    {
        event.preventDefault();

        const pseudoError           = document.querySelector(".pseudo.error");
        const emailError            = document.querySelector(".email.error");
        const passwordError         = document.querySelector(".password.error");
        const passworConfirmdError  = document.querySelector(".password_confirm.error");

        passworConfirmdError.innerHTML  = "";
        passwordError.innerHTML         = "";

        if (password.length < 4)
        {
            passwordError.innerHTML = "Les mots de passe doit faire 4 caracteres minimum";
        }
        else if (password !== controlPassword)
        {
            passworConfirmdError.innerHTML = "Les mots de passe ne correspondent pas";
        }
        else
        {
            await Axios(
            {
                method          : "post",
                url             : `${process.env.REACT_APP_API_URL}api/user/signup`,
                withCredentials : true,
                data            : {pseudo, email, password},
            })
            .then((res) => 
            {
                if (res.data.errors)
                {
                    pseudoError.innerHTML   = res.data.errors.pseudo;
                    emailError.innerHTML    = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                }
                else
                {
                    setFormSubmit(true);
                }
            })
            .catch((err) => 
            {
                console.log(err);
            });
        }
    }

    // ================================
    // Generate
    // ================================
    return (
        <> 
        {formSubmit ? (
            <>
                <h4 className='sucess'>Enregistrement réussi, veuillez vous connecter</h4>
                <LoginForm />
            </>
        ) : (
            <form action='' onSubmit={handleRegister} id="sign_up_form">
                <label htmlFor="pseudo">Pseudo</label>
                <br/>
                <input 
                    type="text" 
                    name="pseudo" 
                    id="pseudo" 
                    onChange={(e) => setPseudo(e.target.value)} 
                    value= {pseudo}
                />
                <div className="pseudo error"></div>
                <br/>

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

                <label htmlFor="password_conf error">Confirmer le mot de passe</label>
                <br/>
                <input 
                    type="password" 
                    name="password" 
                    id="password_conf" 
                    onChange={(e) => setControlPassword(e.target.value)} 
                    value={controlPassword}
                />
                <div className="password_confirm error"></div>
                <br/>
                
                <input type="submit" value="valider l'inscription" />
            </form>

        )}

        
        </>
    );
};

export default SigninForm;