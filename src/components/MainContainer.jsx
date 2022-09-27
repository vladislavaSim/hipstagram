import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Feed from "./Feed";
import {CLoginForm} from "./LoginForm";
import {CProfile} from "./Profile";
import Search, {CSearch} from "./Search";
import Settings from "./Settings";
import {CRegistrationForm} from "./RegistrationForm";
import {connect} from "react-redux";
import {CFollowers} from "./Followers";
import {CFollowings} from "./Followings";
import {NotFound} from "./NotFound";

const MainContainer = ({isLogged}) => {
    // useEffect(() =>{
    //     localStorage.removeItem('authToken')
    // }, [])

    return (
        <div className='main-content'>
            {
                isLogged ?
                    <Routes>
                        <Route path='/' element={<Feed/>} exact/>
                        <Route path='/feed' element={<Feed/>}/>
                        <Route path="/profile/:_id" element={<CProfile/>}/>
                        <Route path="/search" element={<CSearch/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/login' element={<CLoginForm/>}/>
                        <Route path='/registration' element={<CRegistrationForm/>} />
                        <Route path="/followers/:_id" element={<CFollowers/>} />
                        <Route path="/followings/:_id" element={<CFollowings/>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                    :
                    <Routes>
                        <Route path='/login' element={<CLoginForm/>}/>
                        <Route path='/' element={<CLoginForm/>}/>
                        <Route path='/registration' element={<CRegistrationForm/>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
            }

        </div>
    );
};

export const CMainContainer = connect((state) => (
    { isLogged: state?.promise?.me }))
(MainContainer);