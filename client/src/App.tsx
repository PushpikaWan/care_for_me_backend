import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {getAllPosts, getPostById} from "./apis/post";

function App() {

  useEffect(() => {
    getAllPosts().then(r => console.log(r));
    getPostById("634b1bc52688dad2e15a8961").then(r => console.log(r));
  }, [])

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
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
        </header>
      </div>
  );
}

export default App;
