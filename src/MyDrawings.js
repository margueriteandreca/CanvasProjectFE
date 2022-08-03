import { useEffect, useState, useRef, Fragment } from "react";
import "./css/Drawings.css"
import { NavLink } from "react-router-dom"
import { ReactSketchCanvas } from 'react-sketch-canvas';



//useContext

function MyDrawings() {
    const [canvas, setCanvas] = useState([]);
    const [canvasImages, setCanvasImages] = useState([]);
    const canvasesRef = useRef([]);

    useEffect(() => {
        fetch('http://localhost:9292/all_canvas_boards?' + new URLSearchParams({
            api_token: 'abcsam', // all you need to do this change this api-token base on which user you select. Either from session or Cookies
        }), {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.success) {
                    setCanvas(json.data);
                }
            });
    }, []);

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
                                width: "200px",
                                height: "100px",

                            }}>
                                {/* show the image if it exist or else just show the canvas. The canvas will be hidden on the left hand side. */}
                                {canvasImages[i] ? <img width="200px" height="100px" src={canvasImages[i]} alt="drawing" style={{
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
                                {/* The added style is to hide the original canvas board.  */}
                            </div>
                            <NavLink exact="true" to={`/canvas/${item.identifier}`} className="nav-buttons">
                                <button>{item.canvas_name}</button>
                            </NavLink>
                        </Fragment>);
                    })
                }
            </div> 
        </div>

    )

}

export default MyDrawings; 