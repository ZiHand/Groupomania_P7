import React, { useState } from "react";
import Axios from 'axios';
import cookie from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../actions/user_actions";
import { uploadPicture } from "../../actions/user_actions";
import { updateUser } from './../../actions/user_actions';


const UdpateProfile = () => 
{
    // ================================
    // Hooks
    // ================================
    const userData                              = useSelector((state) => state.userReducer);
    const error                                 = useSelector((state) => state.errorReducer.userError);

    const [file, setFile]                       = useState();
    const dispatch                              = useDispatch();
    const [pseudo, setPseudo]                   = useState(userData.pseudo);
    const [password, setPassword]               = useState("");
    const [controlPassword, setControlPassword] = useState("");

    let avatar_url = "./uploads/profil/" + userData.avatar_url;

    // ================================
    // handleUpdate
    // ================================
    const handleUpdate = (e) => 
    {
        e.preventDefault();

        const pseudoError           = document.querySelector(".pseudo.error");
        const passwordError         = document.querySelector(".password.error");
        const passworConfirmdError  = document.querySelector(".password_confirm.error");

        passworConfirmdError.innerHTML  = "";
        passwordError.innerHTML         = "";

        const data = new FormData();
        data.append("userId", userData.id);
        data.append("pseudo", pseudo);

        if (pseudo && pseudo.length < 4)
        {
            pseudoError.innerHTML = "Le pseudo doit faire 4 caracteres minimum";
            return;
        }
        else if (pseudo)
        {
            data.append("pseudo", pseudo);
        }
        
        if (password.length !== 0 && controlPassword.length !== 0 )
        {
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
                data.append("password", password);
            }
        }

        if (file)
        {
            data.append("file", file);
            dispatch(uploadPicture(data, userData.id));
        }
        else
        {
            error.maxSize = "";
        }
        
        dispatch(updateUser(data, userData.id));
    }

    // ================================
    // showHideModoPassword
    // ================================
    function showHideModoPassword () 
    {
        var checkbox = document.querySelector(".modo_checkbox");

        if (checkbox.checked)
        {
            document.querySelector(".modo_pass_container").style.display = "flex";
        }
        else
        {
            document.querySelector(".modo_pass_container").style.display = "none";
        }
    }

    // ================================
    // removeCookie
    // ================================
    const removeCookie = (key) => 
    {
        if (window !== "undefined")
        {
            cookie.remove(key, {expire : 1});
        }
    };

    // ================================
    // logOut
    // ================================
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

    // ================================
    // showHideModoPassword
    // ================================
    const userDelete = () => 
    {
        dispatch(deleteUser(userData.id));
        logout();
    }
    
    // ================================
    // Generate
    // ================================
    return (
        <>
        <form action="" onSubmit={handleUpdate} className="update_profil">
            <div className='img_container'>
                <img src={userData.avatar_url ? avatar_url : "./img/default_avatar2.png"} alt="Avatar utilisateur" title="Changer d'image" />  
            </div>

            <p>{error.maxSize}</p>
            <p>{error.format}</p>

          

            <label htmlFor="file" className="pict_label" title="Changer d'image">Changer d'image</label>
            <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={(e) => {setFile(e.target.files[0]);}}
                title="Changer d'image"
            />
            
            <label htmlFor="pseudo" className="form_item">Changer de pseudo</label>
            <input 
              type="text" 
              name="pseudo" 
              id="pseudo" 
              onChange={(e) => setPseudo(e.target.value)} 
              value= {pseudo}
              className="form_item"
            />

            <div className="pseudo error form_item"></div>
            

            <label htmlFor="password" className="form_item">Changer de mot de passe</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              className="form_item"
            />
            <div className="password error form_item"></div>
            
  
            <label htmlFor="password_conf error" className="form_item">Confirmer le mot de passe</label>
            <input 
                type="password" 
                name="password_confirm" 
                id="password_conf" 
                onChange={(e) => setControlPassword(e.target.value)} 
                value={controlPassword}
                className="form_item"
            />
            <div className="password_confirm error form_item"></div>
      

            <div className="modo_container form_item">
                <input 
                    type="checkbox" 
                    id="modo" 
                    name="modo"
                    className="modo_checkbox"
                    onClick={showHideModoPassword}
                />
                <label htmlFor="modo">Je suis moderateur</label>
            </div>
            <div className="modo_pass_container form_item" id="modo_pass"> 
                <label htmlFor="modopassword" className="c">Saisir le mot de passe fournit par votre résponsable</label>
                <input 
                    type="password" 
                    name="modopassword" 
                    id="modopassword" 
                    //onChange={(e) => setPassword(e.target.value)} 
                    //value={password}
                    className="modo_pass"
                />
            <div className="password error form_item"></div>
            </div>
            <input type="submit" value="Envoyer" className="form_item"/>
            
        </form>
        <button onClick={() => 
            {
                if (window.confirm("Attention! Vous etes sur le point de supprimer votre compte. En etes vous sur ?")) 
                {
                    userDelete();
                }
            }}>
                ! Suprimer le compte !
            </button>
        </>
    );
};

export default UdpateProfile;