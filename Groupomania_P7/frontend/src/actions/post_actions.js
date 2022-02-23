import axios from "axios";

export const GET_POSTS           = "GET_POSTS";

// ================================
// getPosts
// ================================
export const getPosts = () => 
{
  // dispatch will send to reducers
  return (dispatch) => 
  {
    return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/getall/`)
        .then((res) => 
        {
            dispatch({ type: GET_POSTS, payload: res.data });
        })
        .catch((err) => console.log(err));
  };
};