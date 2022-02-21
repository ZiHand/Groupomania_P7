import React, { useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user_actions";

const UploadImg = () => 
{
    // ================================
    // Hooks
    // ================================
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
  
    // ================================
    // Logic
    // ================================
    const handlePicture = (e) => 
    {
      e.preventDefault();
      const data = new FormData();
      data.append("name", userData.pseudo);
      data.append("userId", userData.id);
      data.append("file", file);
  
      dispatch(uploadPicture(data, userData._id));
    };
  
    // ================================
    // Generate
    // ================================
    return (
      <form action="" onSubmit={handlePicture} className="upload_pic">
        <label htmlFor="file" className="pict_label">Changer d'image</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br/>
        <input type="submit" value="Envoyer l'image" />
      </form>
    );
  };
  
  export default UploadImg;