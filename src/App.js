import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {CHeader} from "./components/Header";
import {CMainContainer} from "./components/MainContainer";
import {actionAboutMe} from "./redux/actions/actionsMe";
import {actionAuthLogin} from "./redux/actions/actionsAuth";
import {actionFullGetAllPosts} from "./redux/actions/actionsPost";
import {store} from "./store";
import {useEffect} from "react";

function App() {

//initial dispatches
    if(localStorage.authToken) {
        store.dispatch(actionAboutMe())
        store.dispatch(actionAuthLogin(localStorage.authToken))
        store.dispatch(actionFullGetAllPosts())
    }
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
