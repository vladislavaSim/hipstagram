import React from 'react';
import logo from '../../img/Instagram-logo-with-brush-PNG.png'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAuthLogout} from "../../redux/actions/actionsAuth";
import Button from "../buttons/Button";

const Sidebar = ({onLogout, id, login, isLogged, promise}) => {
    // console.log(promise)
    return (
        <>
            {
                isLogged ?
                   ( <aside className='sidebar'>
                      <div className='head-box'>
                          <img src={logo} style={{width: '100px'}} alt='logo'/>
                          <Link to={`/profile/${id}`} style={{fontWeight: 'bold'}}>{'@' + login}</Link>
                      </div>
                        <div className='link-box'>
                            <Link to={`/profile/${id}`}>Profile</Link>
                            <Link to="/feed">Feed</Link>
                            <Link to="/search">Search</Link>
                            <Link to="/settings">Settings</Link>
                            <Button className='unstyledBtn'
                                    onClick={() => onLogout()}>
                                <Link to={'/login'}>Log out</Link>
                            </Button>
                        </div>
                    </aside>)
                    : (<div className='header'>
                        <img src={logo} style={{width: '100px'}} alt='logo'/>
                    </div>)
            }
        </>
    );
};
//
export  const CHeader = connect((state) => ({
    myId: state?.promise?.me?.payload?._id,
    isLogged: state?.auth?.token,
    // promise: state?.promise,
    id: state.auth?.payload?.sub?.id,
    login: state?.promise?.me?.payload?.login,
    userLogin: state?.promise?.userById?.payload?.login,
}), {
    onLogout: actionAuthLogout
})(React.memo(Sidebar));