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


function App({token}) {
// RETURN TO LAST REMOTE COMMIT ON GIT

//git reset --hard [COMMIT CODE]
// git push -f

  return (
      <main>
          <div className="App">
              <BrowserRouter>
                      {<CHeader/>}
                 <div className='main-content'>
                     <Routes>
                         <Route path='/' element={token ? <Feed/>: <CLoginForm/>}/>
                         <Route path="/profile" element={<CProfile/>}/>
                         <Route path="/search" element={<Search/>}/>
                         <Route path='/settings' element={<Settings/>}/>
                         <Route path='/login' element={<CLoginForm/>} exact/>
                         <Route path='/registration' element={<CRegistrationForm/>} />
                     </Routes>
                 </div>
              </BrowserRouter>
          </div>
      </main>
  );
}

export const CApp = connect((state) => ({
    token: state?.auth?.token,
}))(App);
