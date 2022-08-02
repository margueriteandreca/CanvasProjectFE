
import './css/App.css';
import { BrowserRouter } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./Home"
import MyDrawings from './MyDrawings';
import NavBar from './NavBar';
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { Route, Routes } from "react-router-dom";
import {useState, useEffect} from "react";
import TitleBar from './TitleBar';



function App() {
  return (
    <div id="app">
        <TitleBar />
        <NavBar />
        <Routes>
            <Route exact="true" path="/" element={<Home />}/>
            <Route exact="true" path="/canvas/:canvasIdentifier" element={<Home />}/>
            <Route exact="true" path="/mydrawings" element={<MyDrawings />}/>
            <Route path="/*" element={<h1>You must be lost...</h1>}/>
        </Routes>

    </div>
    );
    
}

export default App;
