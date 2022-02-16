import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/home';
import Profil from '../../pages/profil';
import Login from '../../pages/login';
import Register from '../../pages/register';
import NavBar from '../navBar';

const Index = () => 
{
    return (
        
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" exact element={<Login/>} />
                <Route path="/signup" exact element={<Register/>} />
                <Route path="/profil" exact element={<Profil/>} />
                {/* <Route path="/posts" exact element={<Posts/>} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Index;