import React from 'react';
import Log from '../components/log';

const Register = () => 
{
    return (
        <div className='default_page login_page'>
            <div className='log_container'>
                <Log signin={false} signup={true}/>
        </div>
    </div>
    );
};

export default Register;