import './App.css';
// import Header from "./components/Header";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Settings from "./components/Settings";
import RegistrationForm from './components/RegistrationForm'
import logo from './img/logo.jpg'
import {CLoginForm} from "./components/LoginForm";
import {BrowserRouter as Router, Routes, Route, BrowserRouter, Link} from 'react-router-dom';


function App() {


  return (
      <main>
          {/*/!*<Header />*!/*/}

          <div className="App">
              <BrowserRouter>
                  <div className='header'>
                      <div>
                          <img src={logo} alt='logo' className='logo'/>
                      </div>
                      <div className='link-holder'>
                          <Link to='/login'>Login</Link>
                          <Link to="/">Feed</Link>
                          <Link to="/profile">Profile</Link>
                          <Link to="/search">Search</Link>
                          <Link to="/settings">Settings</Link>
                      </div>
                  </div>
                  <Routes>
                      <Route path='/' element={<Feed/>} exact/>
                      <Route path="/profile" element={<Profile/>}/>
                      <Route path="/search" element={<Search/>}/>
                      <Route path='/settings' element={<Settings/>}/>
                      <Route path='/login' element={<CLoginForm/>}/>
                      <Route path='/registration' element={<RegistrationForm/>} />
                  </Routes>
              </BrowserRouter>
          </div>
      </main>
  );
}

export default App;
