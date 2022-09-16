import React from 'react';
import logo from '../img/logo.jpg'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import Button from "./Button";

const Header = ({onLogout}) => {
    return (
        <div className='header'>
            <img src={logo} alt='logo' className='logo'/>
            <Link to='/login'>Login</Link>
            <Button
                children={
                    <span className="mdc-button__label">
                    Log out
                    </span>}
                onClick={() => onLogout()}
            />
            <Link to="/">Feed</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/search">Search</Link>
            <Link to="/settings">Settings</Link>
        </div>
    );
};

export  const CHeader = connect(null, {
    onLogout: actionAuthLogout
})(Header);