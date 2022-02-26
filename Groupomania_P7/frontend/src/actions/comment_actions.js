import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
//export const GET_COMMENT  = "GET_COMMENT";

// ================================
// getcomment
// ================================
export const getcomments = (postId) => 
{
  return (dispatch) => 
  {
    return axios
        .get(`${process.env.REACT_APP_API_URL}api/comment/getFrom/${postId}`)
        .then((res) => 
        {
            dispatch({ type: GET_COMMENTS, payload: res.data });
        })
        .catch((err) => console.log(err));
  };
};