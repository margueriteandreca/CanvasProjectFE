import "../css/Canvas.css"
import { ReactSketchCanvas } from 'react-sketch-canvas';
import React, { useEffect, useRef, useState } from "react";
import {
    useParams
} from "react-router-dom";
import ToolBar from "./ToolBar";
<<<<<<< HEAD
import { SketchPicker } from 'react-color';
=======
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

>>>>>>> 57cd58153c16b8367f006fb5847c64c2b0a61afb

const AUTO_UPDATE_TIMER_MS = 1000;

let timer;
let lastTimestamp;
let canvasPointsSet = new Set();

function CanvasComponent() {
    const [disableCanvas, setDisableCanvas] = useState(false)
    const [strokeColor, setStrokeColor] = useState("black")
    const [strokeWidth, setStrokeWidth] = useState(5)
<<<<<<< HEAD
    const [eraser, setEraser] = useState(false)
    const [isPickerDisplayed, setIsPickerDisplayed] = useState(false)

=======
    const [canvasName, setCanvasName] = useState('new canvas'); // TODO: have a way to update canvasName
    const [eraser, setEraser] = useState(true)
    const [cookies, setCookie] = useCookies(['apiToken', 'userId', 'firstName', 'lastName', 'loginToggle']);
>>>>>>> 57cd58153c16b8367f006fb5847c64c2b0a61afb

    let { canvasIdentifier } = useParams(); //this will go to app.js => path="/canvas/:canvasIdentifier" and fetch the canvasIdentifier from the url

    const canvasRef = useRef(null); // keep track of the reference to canvas, initially it is null cuz no canvas yet. A new Canvas will auto set the canvasRef because you are setting the ref attribute to canvasRef

<<<<<<< HEAD
    useEffect(() => {
        canvasRef.current.eraseMode(eraser);
    }, [eraser])
=======
    let navigate = useNavigate();

    const createBoardAndRedirect = async () => {
        const canvasPath = await canvasRef.current.exportPaths();
        if (canvasPath?.length === 0) {
            return;
        }
        const createCanvasResponse = await fetch('http://localhost:9292/create_canvas', {
            method: 'POST',
            body: JSON.stringify({
                api_token: cookies.apiToken,
                canvas_name: canvasName
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const createCanvasResponseJson = await createCanvasResponse.json();
        const canvasId = createCanvasResponseJson.data.identifier;

        saveToServer(canvasPath, canvasId, () => {
            navigate(`/canvas/${canvasId}`, { replace: true });
        })
    }

    useEffect(() => {
        if (cookies.apiToken && !canvasIdentifier) {
            createBoardAndRedirect()
        }
        setDisableCanvas(!cookies.apiToken)
    }, [cookies.apiToken]);
>>>>>>> 57cd58153c16b8367f006fb5847c64c2b0a61afb

    const fetchCanvas = () => {
        // this function is to fetch the canvas board
        // if you create a new board. This will generate a canvasIdentifier for you, which you will pass inside this function. 
        if (!canvasIdentifier) {
            return;
        }
        const param = {
            api_token: cookies.apiToken,
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

    const saveToServer = (toSendToServer = [], canvasIdentifierOverride, onComplete) => {
        const identifier = canvasIdentifierOverride || canvasIdentifier;
        if (!identifier) {
            if (cookies.apiToken && toSendToServer.length > 0) {
                createBoardAndRedirect();
            }
            return;
        }
        if (toSendToServer.length === 0) {
            return;
        } // sends the new canvaspath(s) to server

        fetch('http://localhost:9292/add_paths', {
            method: 'POST',
            body: JSON.stringify({
                api_token: cookies.apiToken,
                canvasboard_identifier: identifier,
                canvas_paths: toSendToServer
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (onComplete) {
                    onComplete();
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


    const handleClearCanvas = () => {
        canvasRef.current.clearCanvas()
    }

    const handleUpdateColor = (color) => {
        setStrokeColor(color.hex)
    }

    const handlePickerDisplay = () => {
        setIsPickerDisplayed(!isPickerDisplayed)
    }

    return (
        <div id="canvas-and-tools">
            <div id="canvas">
                <ReactSketchCanvas ref={canvasRef} style={{ width: "900px", height: "500px", pointerEvents: disableCanvas ? "none": '' }}
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


            <div id="tools-and-eraser">
<<<<<<< HEAD
            <div>
                <ToolBar strokeColor={strokeColor} setStrokeColor={setStrokeColor} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} eraser={eraser} setEraser={setEraser} handlePickerDisplay={handlePickerDisplay}/>
                {isPickerDisplayed ? <div id="sketch-picker"><SketchPicker color={strokeColor} onChange={handleUpdateColor} /></div>: null}
            </div>
            <div>
                <button id="erase-button" onClick={handleClearCanvas}>Clear Canvas</button>
            </div>
=======
                <div>
                    <ToolBar strokeColor={strokeColor} setStrokeColor={setStrokeColor} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} eraser={eraser} setEraser={setEraser} />
                </div>
                <div>
                    <button id="erase-button" onClick={handleClearCanvas}>Clear Canvas</button>
                </div>
>>>>>>> 57cd58153c16b8367f006fb5847c64c2b0a61afb
            </div>
        </div>
    )

}

export default CanvasComponent; 
