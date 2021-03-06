import React from 'react';
import logo from './logo.svg';
import {EditPopup} from './components/EditPopup';
import './fonts/yandexsans.css'
import './styles.scss';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <EditPopup guid="bd2ccd93-1b52-49e1-b144-62ef51f84f5c" className="popup" />
    </div>
  );
}

export default App;
