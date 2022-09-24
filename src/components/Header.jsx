import React from 'react';
import logo from '../img/logo.jpg'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import Button from "./Button";

const Header = ({id, onLogout, isLogged, login}) => {
    console.log(isLogged)
    return (
        <>
            <Button pathName={'login'}
                    pathText='Log out!!!'
                    className='ordinaryBtn'
                    onClick={() => onLogout()}
            />
            {
                isLogged ?
                    <div className='header'>
                        <h3>{'@' + login}</h3>
                        <Link to="/">Feed</Link>
                        <Link to={`/profile/${id}`}>Profile</Link>
                        <Link to="/search">Search</Link>
                        <Link to="/settings">Settings</Link>
                        <Button pathName={'login'}
                                pathText='Log out'
                                className='ordinaryBtn'
                                onClick={() => onLogout()}
                        />
                    </div>
                    :
                    <div className='header'>Hello, stranger!</div>
            }
        </>
    );
};

export  const CHeader = connect((state) => ({
    isLogged: state?.promise?.me?.payload,
    id: state?.auth?.payload?.sub?.id,
    login: state.promise?.me?.payload?.login
}), {
    onLogout: actionAuthLogout
})(Header);