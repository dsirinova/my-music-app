import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import Library from '../library';
import Player from '../player';
import Login from '../auth/login';
import './home.css';
import { setClientToken } from "../../spotify";

const Home = () => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const hash = window.location.hash;
        window.location.hash = "";
        if (!token && hash) {
            const _token = hash.split("&")[0].split("=")[1];
            window.localStorage.setItem("token", _token);
            setToken(_token);
            setClientToken(_token);
        } else {
            setToken(token);
            setClientToken(token);
        }
    }, []);

    return !token ?(
        <Login />
    ) : (
        <Router>
            <div className='main-body'>
                <Sidebar />
                <Routes>
                    <Route path='/' element={<Library />} />
                    <Route path='/player' element={<Player />} />
                </Routes>
            </div>
        </Router>
    );
}
export default Home;
