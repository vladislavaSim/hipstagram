import React from 'react';
import logo from '../../img/Instagram-logo-with-brush-PNG.png'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAuthLogout} from "../../redux/actions/actionsAuth";
import Button from "../buttons/Button";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = ({onLogout, id, login, isLogged}) => {

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
                            <Link to={`/profile/${id}`}>
                                <AccountCircleIcon/>
                                Profile
                            </Link>
                            <Link to="/feed">
                                <HomeIcon/>
                                Feed
                            </Link>
                            <Link to="/search">
                                <SearchIcon/>
                                Search
                            </Link>
                            <Link to="/settings">
                                <SettingsIcon/>
                                Settings
                            </Link>
                            <Button className='unstyledBtn'
                                    onClick={() => onLogout()}>
                                <Link to={'/login'}>
                                    <LogoutIcon/>
                                    Log out
                                </Link>
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

export  const CHeader = connect((state) => ({
    myId: state?.promise?.me?.payload?._id,
    isLogged: state?.auth?.token,
    id: state.auth?.payload?.sub?.id,
    login: state?.promise?.me?.payload?.login,
}), {
    onLogout: actionAuthLogout
})(React.memo(Sidebar));