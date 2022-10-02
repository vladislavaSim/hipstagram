import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {CLoginForm} from "./LoginForm";
import {CProfile} from "./Profile";
import {CSearch} from "./Search";
import {CSettings} from "./Settings";
import {CRegistrationForm} from "./RegistrationForm";
import {connect} from "react-redux";
import {CFollowers} from "./Followers";
import {CFollowings} from "./Followings";
import {NotFound} from "./NotFound";
import {CShowPosts} from "./Posts/ShowPosts";
import {CCreatePost} from "./Posts/CreatePost";
import {CExploreUsers} from "./ExploreUsers";

const MainContainer = ({isLogged}) => {
    // useEffect(() =>{
    //     localStorage.removeItem('authToken')
    // }, [])

    return (
        <div className='main-content'>
            {
                localStorage.authToken ?
                    <Routes>
                        <Route path='/' element={<CShowPosts/>} exact/>
                        <Route path='/feed' element={<CShowPosts/>}/>
                        <Route path="/profile/:_id" element={<CProfile/>}/>
                        <Route path="/search" element={<CSearch/>}/>
                        <Route path='/settings' element={<CSettings/>}/>
                        <Route path='/login' element={<CLoginForm/>}/>
                        <Route path='/registration' element={<CRegistrationForm/>} />
                        <Route path="/followers/:_id" element={<CFollowers/>} />
                        <Route path="/followings/:_id" element={<CFollowings/>} />
                        <Route path='/create' element={<CCreatePost />} />
                        <Route path="*" element={<NotFound/>} />
                        <Route path='/explore' element={<CExploreUsers/>}/>
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