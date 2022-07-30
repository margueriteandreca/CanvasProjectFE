
import './css/App.css';
import { BrowserRouter } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import MyDrawings from './MyDrawings';
import NavBar from './NavBar';
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { Route, Routes } from "react-router-dom";
import {useState, useEffect} from "react";



function App() {
  return (
    <>
        <NavBar />
        <Routes>
        <Route exact path="/" element={<Home />}/>
            <Route path="/mydrawings" element={<MyDrawings />}/>
            <Route path="/*" element={<h1>You must be lost...</h1>}/>
        </Routes>

    </>
    );
}

export default App;
