import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {CLoginForm} from "../../pages/auth/LoginForm";
import {CProfile} from "../../pages/profile/Profile";
import {CSearch} from "../../pages/search/Search";
import {CSettings} from "../../pages/settings/Settings";
import {CRegistrationForm} from "../../pages/auth/RegistrationForm";
import {CFollowers} from "../../pages/follows/Followers";
import {CFollowings} from "../../pages/follows/Followings";
import {NotFound} from "../../helpers/NotFound";
import {CShowPosts} from "../../pages/feed/ShowPosts";
import {CCreatePost} from "../../pages/post/CreatePost";
import {CPost} from "../../pages/post/Post";
import {connect} from "react-redux";
import {store} from "../../store";

const MainContainer = ({isLogged, promise}) => {
    // console.log(promise)
    // console.log(store.getState())
    return (

           <>
               {
                   isLogged ?
                       <div className='main-content'>
                           <Routes>
                               <Route path='/' element={<CShowPosts/>} exact/>
                               <Route path='/feed' element={<CShowPosts/>}/>
                               <Route path="/profile/:_id" element={<CProfile/>}/>
                               <Route path="/search" element={<CSearch/>}/>
                               <Route path='/settings' element={<CSettings/>}/>
                               <Route path='/login' element={<CLoginForm/>}/>
                               <Route path='/registration' element={<CRegistrationForm/>} />
                               <Route path="/followers/:_id" element={<CFollowers/>} />
                               <Route path="/following/:_id" element={<CFollowings/>} />
                               <Route path='/create' element={<CCreatePost />} />
                               <Route path='/post/:_id' element={<CPost />} />
                               <Route path="*" element={<NotFound/>} />
                           </Routes>
                       </div>
                           :
                           <div className='main-content-not-logged'>
                               <Routes>
                                   <Route path='/login' element={<CLoginForm/>}/>
                                   <Route path='/' element={<CLoginForm/>}/>
                                   <Route path='/registration' element={<CRegistrationForm/>} />
                                   <Route path="*" element={<NotFound/>} />
                               </Routes>
                           </div>
                      }
           </>
    );
};

export const CMainContainer = connect((state) => ({
    // promise: state?.promise,
    isLogged: state?.auth?.token
}), null)(MainContainer);