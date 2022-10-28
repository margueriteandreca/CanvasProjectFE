import "./css/Home.css"
import React from "react";
import CanvasComponent from "./components/CanvasComponent";
import Collaborators from "./Collab/Collaborators";
import CanvasTitle from "./components/CanvasTitle";
import {useState} from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Home() {
    let { canvasIdentifier } = useParams();

    const [canvasName, setCanvasName] = useState('new canvas'); // TODO: have a way to update canvasName


    useEffect(() => {
        fetch(`http://localhost:9292/canvasboards/${canvasIdentifier}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.canvas_name)
            setCanvasName(data.canvas_name)
        })
    }, [])

    const changeName = (newName) => {
        fetch(`http://localhost:9292/canvasboards/${canvasIdentifier}`, {
            method: 'PATCH',
            body: JSON.stringify(newName),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setCanvasName(data.canvas_name)
        })
    }

    return (
        <div className="main-container" id="home-container">
            <div><CanvasComponent /></div>
            
            <div id="title-and-collab-div">
                <CanvasTitle canvasName={canvasName} setCanvasName={setCanvasName} changeName={changeName}/>
                <Collaborators />
            </div>

        </div>
    )
}

export default Home;

// side nav should not show unless user is login in - last 
// if there is drawing on the board then the draw should be save in memory somewhere so that when you do login in, you can just get
// when you do login then you should do a fetch on create canvas. Once you start drawing then you should fetch for add_path. 
// add delete board button - erase all 