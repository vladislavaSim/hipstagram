import React from 'react';
import logo from '../img/logo.jpg'
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <>
            <img src={logo} alt='logo'/>
            <Link to='/login'>Login</Link>
            <Link to="/">Feed</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/search">Search</Link>
            <Link to="/settings">Settings</Link>
        </>
    );
};

export default Header;