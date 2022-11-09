import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {CHeader} from "./components/Header";
import {CMainContainer} from "./components/MainContainer";

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
