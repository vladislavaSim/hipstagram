import React from 'react';
import logo from '../img/logo.jpg'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import Button from "./Button";

const Header = ({onLogout, userLogin, id, login}) => {

    console.log(login)
    return (
        <>
            {
                userLogin ?
                    <div className='header'>
                        <h3>{'@' + login}</h3>
                        <Link to="/feed">Feed</Link>
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
                    null
            }
        </>
    );
};

export  const CHeader = connect((state) => ({
    promise: state?.promise,
    id: state?.promise?.me?.payload?._id,
    // login: state.auth?.payload?.sub?.login,
    login: state?.promise?.me?.payload?.login,
    userLogin: state?.promise?.userById?.payload?.login,
}), {
    onLogout: actionAuthLogout
})(Header);