import Home from "./icons/pencil.gif"
import StaticPencil from "./icons/pencil.png"
import {NavLink} from "react-router-dom"
import "./css/Nav.css"


function NavBar() {

    return (
    <div id="nav-container">
        <div id="nav-buttons">
        <NavLink exact to="/" className="nav-buttons"><button id="draw-button">
            {/* <img src={StaticPencil} className="nav-icon" alt="" style={{width: "30px"}}></img> */}
            </button></NavLink>
        <NavLink to="/mydrawings" className="nav-buttons"><button><img src={Home} className="nav-icon" alt="" style={{width: "30px"}}></img></button></NavLink>
        </div>
    </div>

    )

}

export default NavBar; 