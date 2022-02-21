import React, { useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user_actions";
import { updateUser } from './../../actions/user_actions';

const UdpateProfile = () => 
{
    // ================================
    // Hooks
    // ================================
    const [file, setFile]                       = useState();
    const dispatch                              = useDispatch();
    const userData                              = useSelector((state) => state.userReducer);
    const [pseudo, setPseudo]                   = useState(userData.pseudo);
    const [password, setPassword]               = useState("");
    const [controlPassword, setControlPassword] = useState("");
    const error                                 = useSelector((state) => state.errorReducer.userError);


    let avatar_url = "./uploads/profil/" + userData.avatar_url;

    // ================================
    // Logic
    // ================================
    const handleUpdate = (e) => 
    {
        e.preventDefault();

        
        const passwordError         = document.querySelector(".password.error");
        const passworConfirmdError  = document.querySelector(".password_confirm.error");

        passworConfirmdError.innerHTML  = "";
        passwordError.innerHTML         = "";

        const data = new FormData();
        data.append("userId", userData.id);
        data.append("pseudo", pseudo);

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
        
        data.append("file", file);
        dispatch(uploadPicture(data, userData.id));
        dispatch(updateUser(data, userData.id));
    }

    const changePicture = async () =>
    {
        //console.log("changePicture : " + JSON.stringify(file));
        
        avatar_url = "./uploads/profil/" + file.name;
        console.log(avatar_url);
        console.log(file);
    }

    // ================================
    // Generate
    // ================================
    return (
        <>
        <form action="" onSubmit={handleUpdate} className="update_profil">
            <div className='img_container'>
                <img src={userData.avatar_url ? avatar_url : "./img/default_avatar2.png"} alt="Avatar utilisateur" title="Changer d'image" onClick={changePicture}/>  
                <p>{error.maxSize}</p>
                <p>{error.format}</p>
            </div>
            <label htmlFor="file" className="pict_label">Changer d'image</label>
            <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => 
                {
                    setFile(e.target.files[0]);
                    //changePicture();
                }}
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
          <input type="submit" value="Envoyer" className="form_item"/>
        </form>
        </>
      );
};

export default UdpateProfile;