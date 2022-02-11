import React from 'react';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../pages/home';
import Profil from '../../pages/profil';
import NavBar from '../navBar';

const index = () => 
{
    return (
        
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/profil" exact element={<Profil/>} />
                {/* <Navigate to="/" /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default index;