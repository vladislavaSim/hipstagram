import React from 'react';
import {Route, Routes} from "react-router-dom";
import Feed from "./Feed";
import {CLoginForm} from "./LoginForm";
import {CProfile} from "./Profile";
import Search from "./Search";
import Settings from "./Settings";
import {CRegistrationForm} from "./RegistrationForm";
import {connect} from "react-redux";

const MainContainer = ({isLogged}) => {
    return (
        <div className='main-content'>
            {
                isLogged ?
                    <Routes>
                        <Route path='/' element={isLogged ? <Feed/>: <CLoginForm/>}/>
                        <Route path="/profile" element={<CProfile/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/login' element={<CLoginForm/>} exact/>
                        <Route path='/registration' element={<CRegistrationForm/>} />
                    </Routes>
                    :
                    <Routes>
                        <Route path='/login' element={<CLoginForm/>} exact/>
                        <Route path='/registration' element={<CRegistrationForm/>} />
                    </Routes>

            }

        </div>
    );
};

export const CMainContainer = connect((state) => (
    { isLogged: state?.auth.token }))
(MainContainer);