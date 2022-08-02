import { useEffect, useState } from "react";
import "./css/Drawings.css"
import { NavLink } from "react-router-dom"



//useContext

function MyDrawings() {
    const [canvas, setCanvas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9292/all_canvas_boards?' + new URLSearchParams({
            api_token: 'abcsam',
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

    return (
        <div className="main-container">
            <div id="my-drawings-container">
                {
                    canvas.map((item) => {
                        return (<NavLink key={item.id} exact="true" to={`/canvas/${item.identifier}`} className="nav-buttons">
                            <button>{item.canvas_name}</button>
                        </NavLink>);
                    })
                }
            </div> 
        </div>

    )

}

export default MyDrawings; 