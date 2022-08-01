import Home from "./icons/pencil.gif"
import { NavLink } from "react-router-dom"
import "./css/Nav.css"
import "./css/SignIn.css"
import SignIn from "./SignIn";
import {useState} from "react";


function NavBar() {
  
    return (
        <div id="nav-container">
            <div id="nav-buttons">
                <NavLink exact="true" to="/" className="nav-buttons">
                    <button id="draw-button" />
                </NavLink>
                <NavLink to="/mydrawings" className="nav-buttons">
                    <button id="pictures-button" />
                </NavLink>
            </div>
    </div>

    )

}

export default NavBar; 