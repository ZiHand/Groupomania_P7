import React, { useEffect, useState } from 'react';
import Routes from './components/routes';
import { UidContext } from './components/app_context';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user_actions';

const App = () => 
{
  // ================================
  // Hooks
  // ================================
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() =>
  {
    const fetchToken = async() =>
    {
      await Axios(
      {
        method          : "get",
        url             : `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials : true,
      })
        .then((res) => 
        {
          setUid(res.data);
        })
        .catch((err) => console.log("Front : No token"))
    }

    fetchToken();

    if (uid)
      dispatch(getUser(uid));
    
  }, [uid]) // [] mean not infinit call ! if args change, called again.

  // ================================
  // Logic
  // ================================

  // ================================
  // Generate
  // ================================
  return (
    <UidContext.Provider value={{uid}}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;