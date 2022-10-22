import React from 'react';
import logo from '../img/Instagram-logo-with-brush-PNG.png'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import Button from "./Button";

const Header = ({onLogout, id, login, promise}) => {

    return (
        <>
            {
                login ?
                   ( <div className='header'>
                      <div className='link-box'>
                          <img src={logo} style={{width: '100px'}}/>
                          <Link to={`/profile/${id}`} style={{fontWeight: 'bold'}}>{'@' + login}</Link>
                      </div>
                        <div className='link-box'>
                            <Link to="/feed">Feed</Link>
                            <Link to="/search">Search</Link>
                            <Link to="/settings">Settings</Link>
                            <Button className='unstyledBtn'
                                    onClick={() => onLogout()}>
                                <Link to={'/login'}>Log out</Link>
                            </Button>
                        </div>
                    </div>)
                    : (<div className='header'>
                        <img src={logo} style={{width: '100px'}} alt='logo'/>
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