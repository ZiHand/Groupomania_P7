import React, { useContext } from 'react';
import { UidContext } from '../components/app_context';

const Profil = () => 
{
    const uidCtx    = useContext(UidContext);

    return (
        <div className='profil_page'>
            <div className="log-container">
        
          <div className="img_container">
            <img src="./img/default_avatar2.png" alt="img-log" />
          </div>
        </div>
        </div>
    );
};

export default Profil;