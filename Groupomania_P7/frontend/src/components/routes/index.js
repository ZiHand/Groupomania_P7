import React from 'react';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../pages/home';
import Profil from '../../pages/profil';

const index = () => 
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/profil" exact element={<Profil/>} />
                {/* <Navigate to="/" /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default index;