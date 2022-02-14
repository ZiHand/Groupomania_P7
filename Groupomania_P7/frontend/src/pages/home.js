import React from 'react';
import Log from '../components/log';

const Home = () => 
{
    return (
        <div className='home_page'>
            <div className='log_container'>
                <Log signin={false} signup={true}/>
            </div>
        </div>
    );
};

export default Home;