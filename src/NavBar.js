import Home from "./icons/pencil.gif"
import { NavLink } from "react-router-dom"
import "./css/Nav.css"


function NavBar() {

    return (
        <div id="nav-container">
            <div id="nav-buttons">
                <NavLink exact="true" to="/create" className="nav-buttons">
                    <button id="draw-button" />
                </NavLink>
                <NavLink to="" className="nav-buttons">
                    <button id="pictures-button" />
                </NavLink>
            </div>
        </div>

    )

}

export default NavBar; 