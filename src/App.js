import './App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter, Link} from 'react-router-dom';
import {CHeader} from "./components/Header";
import {connect} from "react-redux";
import {CMainContainer} from "./components/MainContainer";
import {useEffect} from "react";


function App({token}) {
// RETURN TO LAST REMOTE COMMIT ON GIT

//git reset --hard [COMMIT CODE]
// git push -f

//  DELETE LAST COMMIT WITHOUT CHANGING LOCAL CODE TO REMAKE COMMIT PROPERLY

//git reset --soft [COMMIT CODE]
    useEffect(() => {
        localStorage.removeItem('authToken');
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

export const CApp = connect((state) => ({

}))(App);
