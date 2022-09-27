import './App.css';
// import Header from "./components/Header";
import Feed from "./components/Feed";
import {CProfile} from "./components/Profile";
import Search from "./components/Search";
import Settings from "./components/Settings";
import {CRegistrationForm} from './components/RegistrationForm'
import logo from './img/logo.jpg'
import {CLoginForm} from "./components/LoginForm";
import {BrowserRouter as Router, Routes, Route, BrowserRouter, Link} from 'react-router-dom';
import {CHeader} from "./components/Header";
import {connect} from "react-redux";
import {CMainContainer} from "./components/MainContainer";
import {useEffect} from "react";


function App({token}) {
// RETURN TO LAST REMOTE COMMIT ON GIT

//git reset --hard [COMMIT CODE]
// git push -f
//     useEffect(() => {
//         localStorage.removeItem('authToken');
//     },[])
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

export const CApp = connect((state) => ({

}))(App);
