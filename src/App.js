import './App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter, Link} from 'react-router-dom';
import {CHeader} from "./components/Header";
import {connect} from "react-redux";
import {CMainContainer} from "./components/MainContainer";
import {useEffect} from "react";
import {actionAboutMe, actionAuthLogin, actionFullGetAllPosts, actionFullLogin} from "./redux/actions/actions";


function App() {

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

export default App
