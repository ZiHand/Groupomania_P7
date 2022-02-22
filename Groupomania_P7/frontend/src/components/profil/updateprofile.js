import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    // Logic
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

        if (pseudo.length < 5)
        {
            pseudoError.innerHTML = "Le pseudo doit faire 6 caracteres minimum";
            return;
        }
        else
        {
            data.append("pseudo", pseudo);
        }
        
        if (password.length !== 0 && controlPassword.length !== 0 )
        {
            if (password.length < 6)
            {
                passwordError.innerHTML = "Les mots de passe doit faire 6 caracteres minimum";
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

    const showHideModoPass = (e) =>
    {
        //e.preventDefault();

        console.log(e);
    }

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

            <br />

            <label htmlFor="file" className="pict_label">Changer d'image</label>
            <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {setFile(e.target.files[0]);}}
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
            <br/>

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
            <br/>
  
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
            <br/>

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
          

            <br/>
            <input type="submit" value="Envoyer" className="form_item"/>
        </form>
        </>
    );
};

export default UdpateProfile;