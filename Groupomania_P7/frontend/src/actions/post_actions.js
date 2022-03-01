import axios from "axios";

export const GET_POSTS   = "GET_POSTS";
export const ADD_POST    = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const ADD_COMMENT    = "ADD_COMMENT";
export const EDIT_COMMENT   = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// ================================
// getPosts
// ================================
export const getPosts = (num) => 
{
  return async (dispatch) => 
  {   
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/post/getall/`)
        .then((res) =>
        {
          const array = res.data.slice(0, num);
          dispatch({ type: GET_POSTS, payload: array });
        })
        .catch ((err) =>
        {
          return console.log(err);
        });
  };
};

// ================================
// addPost
// ================================
export const addPost = (userId, formData) => 
{
  console.log("addPost");
  console.log(formData);
  
  return async (dispatch) => 
  {
      return axios
      .post( `${process.env.REACT_APP_API_URL}api/post/${userId}`, formData)
      .then(() =>
      {
        dispatch(getPosts());
      })
  };
};

// ================================
// updatePost
// ================================
export const updatePost = (postId, message) => 
{
  return async (dispatch) => 
  {
    await axios(
      {
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        data: { message },
      })
        .then((res) => 
        {
          dispatch({ type: UPDATE_POST, payload: { message, postId } });
        })
        .catch((err) => console.log(err));
  };
};

// ================================
// deletePost
// ================================
export const deletePost = (postId) => 
{
  return async (dispatch) => 
  {
    await axios(
      {
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      })
        .then((res) => 
        {
          dispatch({ type: DELETE_POST, payload: { postId } });
        })
        .catch((err) => console.log(err));
  };
};

// ================================
// addComment
// ================================
export const addComment = (postId, commenterId, message) => 
{
  return async (dispatch) => 
  {
    await axios(
      {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/comment/${commenterId}/${postId}`,
        data: { message },
      })
        .then((res) => 
        {
          dispatch({ type: ADD_COMMENT, payload: { postId } });
        })
        .catch((err) => console.log(err));
  };
};

// ================================
// editComment
// ================================
export const editComment = (commentId, message) => 
{
  return async (dispatch) => 
  {
    await axios(
      {
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
        data: { message },
      })
        .then((res) => 
        {
          dispatch({ type: UPDATE_POST, payload: { message, commentId } });
        })
        .catch((err) => console.log(err));
  };
};

// ================================
// deleteComment
// ================================
export const deleteComment = (commentId) => 
{
  return async (dispatch) => 
  {
    await axios(
      {
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
      })
        .then((res) => 
        {
          dispatch({ type: DELETE_COMMENT, payload: { commentId } });
        })
        .catch((err) => console.log(err));
  };
};