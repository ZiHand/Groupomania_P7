import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/home';
import Profil from '../../pages/profil';
import Posts from '../../pages/posts';
import NavBar from '../navBar';

const Index = () => 
{
    return (
        
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/profil" exact element={<Profil/>} />
                {/* <Route path="/posts" exact element={<Posts/>} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Index;