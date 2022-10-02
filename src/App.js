import './App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter, Link} from 'react-router-dom';
import {CHeader} from "./components/Header";
import {connect} from "react-redux";
import {CMainContainer} from "./components/MainContainer";
import {useEffect} from "react";
import {actionAboutMe, actionAuthLogin, actionFullGetAllPosts, actionFullLogin} from "./redux/actions/actions";


function App({aboutMe, authLogin, getAllPosts}) {
// RETURN TO LAST REMOTE COMMIT ON GIT

//git reset --hard [COMMIT CODE]
// git push -f

//  DELETE LAST COMMIT WITHOUT CHANGING LOCAL CODE TO REMAKE COMMIT PROPERLY

//git reset --soft [COMMIT CODE]
    useEffect(() => {
        if(localStorage.authToken) {
            aboutMe()
            authLogin(localStorage.authToken)
            getAllPosts()
        }
    },[])

  return (
      <main>
          <div className="App">
              <BrowserRouter>
                  <CHeader/>
                  <CMainContainer/>
              </BrowserRouter>
          </div>
      </main>
  );
}

export const CApp = connect(null, {
    // onLogin: actionFullLogin,
    aboutMe: actionAboutMe,
    authLogin: actionAuthLogin,
    getAllPosts: actionFullGetAllPosts
})(App);
