import React, { useEffect, useState } from 'react';
import Routes from './components/routes';
import { UidContext } from './components/app_context';
import Axios from 'axios';

const App = () => 
{
  // ================================
  // Hooks
  // ================================
  const [uid, setUid] = useState(null);

  useEffect(() =>
  {
    
    const fetchToken = async() =>
    {
      console.log("Front : fetchToken");

      await Axios(
      {
        method          : "get",
        url             : "http://localhost:8080/jwtid",
        withCredentials : true,
      })
        .then((res) => 
        {
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => console.log("Front : No token"))
    }

    fetchToken();

    console.log("Front : fetchToken END");
    
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