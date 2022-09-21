import React from 'react';
import logo from '../img/logo.jpg'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import Button from "./Button";

const Header = ({onLogout, isLogged}) => {
    return (
        <>
            {
                isLogged ?
                    <div className='header'>
                        <Link to="/">Feed</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/search">Search</Link>
                        <Link to="/settings">Settings</Link>
                        <Button pathName={'login'}
                                pathText='Log out'
                                className='ordinaryBtn'
                                onClick={() => onLogout()}
                        />
                    </div>
                    :
                    null
            }
        </>
    );
};

export  const CHeader = connect((state) => ({
    isLogged: state?.promise?.login?.payload
}), {
    onLogout: actionAuthLogout
})(Header);