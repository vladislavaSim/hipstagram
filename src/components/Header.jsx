import React from 'react';
import logo from '../img/logo.jpg'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import Button from "./Button";

const Header = ({onLogout, login, state}) => {
    const id = state?.promise?.userById?.payload?._id
    console.log(state)
    return (
        <>
            {
                localStorage.authToken ?
                    (<div className='header'>
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
                    </div>)
                    :
                    null
            }
        </>
    );
};

export  const CHeader = connect((state) => ({
    id: state?.auth?.payload?.sub?.id,
    login: state.promise?.me?.payload?.login
}), {
    onLogout: actionAuthLogout
})(Header);