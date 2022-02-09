import React from 'react';
import Log from '../components/log';

const profil = () => 
{
    return (
        <div className='profil_page'>
            <div className='log_container'>
            <Log signin={false} signup={true}/>
            </div>
        </div>
    );
};

export default profil;