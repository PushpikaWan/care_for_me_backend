import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {getAllPosts, getPostById} from "./apis/post";
import PostPage from "./components/post_page/post_page";
import {StyledEngineProvider} from "@mui/material";
import AppRouter from "./app-router";

function App() {

  useEffect(() => {
    getAllPosts().then(r => console.log(r));
    getPostById("634b1bc52688dad2e15a8961").then(r => console.log(r));
  }, [])

  return (<AppRouter/>);
}

export default App;
