import "./css/Home.css"
import React from "react";
import CanvasComponent from "./components/CanvasComponent";

function Home() {
    return (
        <div className="main-container" id="home-container">
            <CanvasComponent />
        </div>
    )
}

export default Home;

// side nav should not show unless user is login in
// if there is drawing on the board then the draw should be save in memory somewhere so that when you do login in, you can just get
// when you do login then you should do a fetch on create canvas. Once you start drawing then you should fetch for add_path. 
// add delete board button