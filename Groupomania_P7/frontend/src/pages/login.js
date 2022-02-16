import React from 'react';
import Log from '../components/log';

const Log_register = () => 
{
    return (
        <div className='default_page login_page'>
            <div className='log_container'>
                <Log signin={true} signup={false}/>
            </div>
        </div>
    );
};

export default Log_register;