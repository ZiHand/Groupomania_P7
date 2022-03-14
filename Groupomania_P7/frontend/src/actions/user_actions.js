import axios from "axios";
import { getUsers } from "../actions/users_actions";

export const GET_USER           = "GET_USER";
export const DELETE_USER        = "DELETE_USER";
export const UPLOAD_PICTURE     = "UPLOAD_PICTURE";
export const UPDATE_USER_NAME   = "UPDATE_USER_NAME";
export const GET_USER_ERRORS    = "GET_USER_ERRORS";
export const UPDATE_USER_ERRORS = "UPDATE_USER_ERRORS";

// ================================
// getUser
// ================================
export const getUser = (uid) => 
{
  // dispatch will send to reducers
  return (dispatch) => 
  {
    return axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        .then((res) => 
        {
            dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err));
  };
};

// ================================
// deleteUser
// ================================
export const deleteUser = (uid) => 
{
  console.log(uid);
  console.log(`${process.env.REACT_APP_API_URL}api/user/${uid}`);

  return async (dispatch) => 
  {
    await axios(
      {
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      })
        .then((res) => 
        {
          console.log(res);
        })
        .catch((err) => console.log(err));
  };

};

// ================================
// uploadPicture
// ================================
export const uploadPicture = (data, id) => 
{
  return (dispatch) => 
  {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => 
      {
        if (res.data.errors) 
        {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } 
        else 
        {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => 
            {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

// ================================
// updateUser
// ================================
export const updateUser = (formData, id) => 
{
  let data = {};
  for (var key of formData.entries()) 
  {
    data[key[0]] = key[1];
  }

  return (dispatch) => 
  {
    const pseudoError           = document.querySelector(".pseudo.error");
    const passwordError         = document.querySelector(".password.error");
    const modoError             = document.querySelector(".adminpseudo.error");

    return axios(
      {
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/user/` + id,
        withCredentials : true,
        data: data,
      })
      .then((res) => 
      {
        if (res.data)
        {
          if (res.data.pseudo)
          {
            pseudoError.innerHTML = res.data.errors.pseudo;
          }
          else
          {
            pseudoError.innerHTML = "";
          }

          if (res.data.password)
          {
            passwordError.innerHTML = res.data.errors.password;
          }
          else
          {
            passwordError.innerHTML = "";
          }

          if (res.data.moderator)
          {
            modoError.innerHTML = res.data.moderator;
          }
          else
          {
            modoError.innerHTML = "";
          }
            
        }
        else
        {
          passwordError.innerHTML = "";
          pseudoError.innerHTML = "";
        }

        dispatch({ type: UPDATE_USER_NAME, payload: res.data.pseudo});
        dispatch(getUsers());
      })
      .catch((err) => console.log(err));
  };
};