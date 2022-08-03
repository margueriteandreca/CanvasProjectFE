import "../css/Canvas.css"
import { ReactSketchCanvas } from 'react-sketch-canvas';
import React, { useEffect, useRef, useState } from "react";
import {
    useParams
} from "react-router-dom";
import ToolBar from "./ToolBar";

const AUTO_UPDATE_TIMER_MS = 1000;

let timer;
let lastTimestamp;
let canvasPointsSet = new Set();

function CanvasComponent() {
    const [strokeColor, setStrokeColor] = useState("black")
    const [strokeWidth, setStrokeWidth] = useState(5)


    let { canvasIdentifier } = useParams(); //this will go to app.js => path="/canvas/:canvasIdentifier" and fetch the canvasIdentifier from the url

    const canvasRef = useRef(null); // keep track of the reference to canvas, initially it is null cuz no canvas yet. A new Canvas will auto set the canvasRef because you are setting the ref attribute to canvasRef

    const fetchCanvas = () => {
        // this function is to fetch the canvas board
        // if you create a new board. This will generate a canvasIdentifier for you, which you will pass inside this function. 
        if (!canvasIdentifier) {
            return;
        }
        const param = {
            api_token: 'abcsam', // you should get the api token from login 
            canvasboard_identifier: canvasIdentifier //put the generated hash here.
        };
        if (lastTimestamp) {
            param.last_timestamp = lastTimestamp; // this will make sure that you dont over fetch. Because the server will only return everything after the last timestamp.
        }
        fetch('http://localhost:9292/canvas_board', {
            method: 'POST',
            body: JSON.stringify(param),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.success && json.data && json.data.length) {
                    canvasRef.current.loadPaths(json.data);
                    lastTimestamp = json.data[json.data.length - 1].metadata.created_at;
                }
            }); //gets the canvas path information from the server and set it to canvasboard
    }

    const saveToServer = (toSendToServer = []) => {
        if (!canvasIdentifier) {
            return;
        }
        if (toSendToServer.length === 0) {
            return;
        } // sends the new canvaspath(s) to server

        fetch('http://localhost:9292/add_paths', {
            method: 'POST',
            body: JSON.stringify({
                api_token: 'abcsam',
                canvasboard_identifier: canvasIdentifier,
                canvas_paths: toSendToServer
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (!json.success) {
                    console.log(json)
                }
            });
    }

    const setTimerForAutoRefresh = () => {
        timer = setTimeout(() => {
            fetchCanvas();
            setTimerForAutoRefresh();
        }, AUTO_UPDATE_TIMER_MS);
    } // setting a timer so that at x seconds, it will fetch from the server (downloading paths from the server so you get the lastest points)

    useEffect(() => {
        canvasPointsSet = new Set();
        lastTimestamp = undefined;
        clearTimeout(timer)
        canvasRef.current.resetCanvas();

        fetchCanvas();

        setTimerForAutoRefresh();
        return () => clearTimeout(timer);
    }, [canvasIdentifier]);
    // when app loads, clear all the information. Download all the paths belonging to that canvas using fetchCanvas(). And start the timer to auto fetch again. 


    return (
        <div id="canvas-and-tools">
            <div id="canvas">
                <ReactSketchCanvas ref={canvasRef} style={{ width: "900px", height: "500px" }}
                    onStroke={(data) => {
                        if (data.paths.length === 1) { // handles dot
                            if (canvasPointsSet.has(data)) {
                                saveToServer([data]);
                            }
                            canvasPointsSet.add(data)
                        } else if (data.paths.length > 1) { // handles line
                            saveToServer([data]);
                        }
                    }
                    } strokeColor={strokeColor} strokeWidth={strokeWidth} />

            </div>

            <div><ToolBar strokeColor={strokeColor} setStrokeColor={setStrokeColor} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} /></div>
        </div>
    )

}

export default CanvasComponent; 
