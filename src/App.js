import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {CHeader} from "./components/Header";
import MainContainer from "./components/MainContainer";

function App() {

  return (
      <main>
          <div className="App">
              <BrowserRouter>
                  <CHeader/>
                  <MainContainer/>
              </BrowserRouter>
          </div>
      </main>
  );
}

export default App
