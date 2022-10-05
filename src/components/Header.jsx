import React from 'react';
import logo from '../img/Instagram-logo-with-brush-PNG.png'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import Button from "./Button";

const Header = ({onLogout, userLogin, myId, id, login, promise}) => {

    return (
        <>
            {
                login ?
                   ( <div className='header'>
                        <img src={logo} style={{width: '100px'}}/>
                        <h3>{'@' + login}</h3>
                        <Link to="/feed">Feed</Link>
                        <Link to={`/profile/${id}`}>Profile</Link>
                        <Link to="/search">Search</Link>
                        <Link to="/settings">Settings</Link>
                        <Button className='unstyledBtn'
                                onClick={() => onLogout()}>
                            <Link to={'/login'}>Log out</Link>
                        </Button>
                    </div>)
                    : (<div className='header'>
                        <img src={logo} style={{width: '100px'}}/>
                    </div>)
            }
        </>
    );
};
//
export  const CHeader = connect((state) => ({
    promise: state?.promise,
    myId: state?.promise?.me?.payload?._id,
    id: state.auth?.payload?.sub?.id,
    login: state?.promise?.me?.payload?.login,
    userLogin: state?.promise?.userById?.payload?.login,
}), {
    onLogout: actionAuthLogout
})(Header);