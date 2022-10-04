import React from 'react';
import logo from '../img/logo.jpg'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import Button from "./Button";

const Header = ({onLogout, userLogin, myId, login, promise}) => {
    console.log(promise)

    return (
        <>
            {
                login ?
                    <div className='header'>
                        <h3>{'@' + login}</h3>
                        <Link to="/feed">Feed</Link>
                        <Link to={`/profile/${myId}`}>Profile</Link>
                        <Link to="/search">Search</Link>
                        <Link to="/settings">Settings</Link>
                        <Button
                                className='ordinaryBtn'
                                onClick={() => onLogout()}>
                            <Link to={'/login'}>Log out</Link>
                        </Button>
                    </div>
                    :
                    <p>логина нет, хедер в разработке</p>
            }
        </>
    );
};

export  const CHeader = connect((state) => ({
    promise: state?.promise,
    myId: state?.promise?.me?.payload?._id,
    // login: state.auth?.payload?.sub?.login,
    login: state?.promise?.me?.payload?.login,
    userLogin: state?.promise?.userById?.payload?.login,
}), {
    onLogout: actionAuthLogout
})(Header);