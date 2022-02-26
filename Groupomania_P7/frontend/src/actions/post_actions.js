import axios from "axios";

export const GET_POSTS           = "GET_POSTS";

// ================================
// getPosts
// ================================
export const getPosts = (num) => 
{
  // dispatch will send to reducers
  return (dispatch) => 
  {
    return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/getall/`)
        .then((res) => 
        {
            const array = res.data.slice(0, num);
            dispatch({ type: GET_POSTS, payload: array });
        })
        .catch((err) => console.log(err));
  };
};