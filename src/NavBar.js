import Home from "./icons/pencil.gif"
import {NavLink} from "react-router-dom"
import "./css/Nav.css"


function NavBar() {

    return (
    <div id="nav-container">
        <div id="nav-buttons">
        <NavLink exact to="/" className="nav-buttons"><button id="draw-button">
            </button></NavLink>
        <NavLink to="/mydrawings" className="nav-buttons"><button id="pictures-button"></button></NavLink>
        </div>
    </div>

    )

}

export default NavBar; 