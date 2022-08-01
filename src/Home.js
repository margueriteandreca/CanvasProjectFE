import "./css/Home.css"
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

function Canvas() {
    const [strokeColor, setStrokeColor] = useState("black")
    const [strokeWidth, setStrokeWidth] = useState(5)


    let { canvasIdentifier } = useParams();

    const canvasRef = useRef(null);

    const fetchCanvas = () => {
        const param = {
            api_token: 'abcsam',
            canvasboard_identifier: canvasIdentifier
        };
        if (lastTimestamp) {
            param.last_timestamp = lastTimestamp;
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
            });
    }

    const saveToServer = (toSendToServer = []) => {
        if (toSendToServer.length === 0) {
            return;
        }

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

    const getAllPathsAndSaveToServer = (data) => {
        saveToServer([data]);
    }

    const setTimerForAutoRefresh = () => {
        timer = setTimeout(() => {
            fetchCanvas();
            setTimerForAutoRefresh();
        }, AUTO_UPDATE_TIMER_MS);
    }

    useEffect(() => {
        canvasPointsSet = new Set();
        lastTimestamp = undefined;
        clearTimeout(timer)

        fetchCanvas();

        setTimerForAutoRefresh();
        return () => clearTimeout(timer);
    }, [canvasIdentifier]);


    return (
        <div className="main-container" id="home-container">
            <div id="canvas">
                <ReactSketchCanvas ref={canvasRef} style={{ width: "900px", height: "500px" }} 
                onStroke={(data) => {
                    if (data.paths.length === 1) { // handles dot
                        if (canvasPointsSet.has(data)) {
                            getAllPathsAndSaveToServer(data);
                        }
                        canvasPointsSet.add(data)
                    } else if (data.paths.length > 1) { // handles line
                        getAllPathsAndSaveToServer(data);
                    }
                }
                } strokeColor={strokeColor} strokeWidth={strokeWidth}/>

            </div>

            <div><ToolBar strokeColor={strokeColor} setStrokeColor={setStrokeColor} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth}/></div>
        </div>

    )

}

export default Canvas; 