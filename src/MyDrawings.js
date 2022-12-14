import { useEffect, useState, useRef, Fragment } from "react";
import "./css/Drawings.css"
import { NavLink } from "react-router-dom"
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useCookies } from 'react-cookie';

function MyDrawings() {
    const [canvas, setCanvas] = useState([]);
    const [canvasImages, setCanvasImages] = useState([]);
    const canvasesRef = useRef([]);

    const [cookies, setCookie] = useCookies(['apiToken', 'userId', 'firstName', 'lastName', 'loginToggle']);

    useEffect(() => {
        fetch('http://localhost:9292/all_canvas_boards', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            method: "POST",
            body: JSON.stringify({
                api_token: cookies.apiToken
            })
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.success) {
                    const set = new Set();
                    
                    // dedupping duplicated canvas
                    setCanvas(json.data.filter((board) => {
                        if (set.has(board.id)) {
                            return false;
                        } else {
                            set.add(board.id);
                            return true;
                        }
                    }));
                } else {
                    setCanvas([]);
                }
            });
    }, [cookies.apiToken, cookies.loginToggle]);

    useEffect(() => {
        canvasesRef.current = canvasesRef.current.slice(0, canvas.length);
        setTimeout(() => {
            if (canvas.length === 0) {
                return
            }
            canvasesRef.current.forEach((ref, i) => {
                if (canvas[i].canvas_paths.length) {
                    ref?.loadPaths(canvas[i].canvas_paths);
                }
            })
        }, 200);
        // The top setTimeout gets call first to load paths and the second gets call after. This may seem like a lag from the server
        setTimeout(() => {
            if (canvas.length === 0) {
                return
            }
            canvasesRef.current.forEach((ref, i) => {
                ref?.exportImage('jpeg').then((data) => {
                    canvasImages[i] = data;
                    setCanvasImages([...canvasImages]);
                })
            })
        }, 600);
    }, [canvas]);

    return (
        <div className="main-container">
            <div id="my-drawings-container">
                {
                    canvas.map((item, i) => {
                        return (<Fragment key={item.id} >
                            <div style={{
                                width: "250px",
                                height: "125px",

                            }}>
                                {/* show the image if it exist or else just show the canvas. The canvas will be hidden on the left hand side. */}
                                <div className="thumbnail-container">
                                    <div id="image-container">{canvasImages[i] ? <img width="250px" height="125px" src={canvasImages[i]} alt="drawing" style={{
                                        objectFit: "cover"
                                    }} /> : <ReactSketchCanvas ref={el => {
                                        canvasesRef.current[i] = el
                                    }} style={{
                                        width: "900px",
                                        height: "500px",
                                        pointerEvents: "none",
                                        position: 'absolute',
                                        left: -1000000,
                                    }} />
                                    }
                                    </div>
                                    <div id="canvas-name">
                                        <NavLink exact="true" to={`/canvas/${item.identifier}`}>
                                        <p className="drawing-name-button">{item.canvas_name}</p>
                                        </NavLink>
                                    </div>
                                </div>
                                {/* The added style is to hide the original canvas board.  */}
                            </div>
                        </Fragment>);
                    })
                }
            </div>
        </div >

    )

}

export default MyDrawings; 