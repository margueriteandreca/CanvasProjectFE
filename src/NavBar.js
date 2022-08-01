import Home from "./icons/pencil.gif"
import {NavLink} from "react-router-dom"
import "./css/Nav.css"
import "./css/SignIn.css"
import SignIn from "./SignIn";
import {useState} from "react";


function NavBar() {
    const [isDisplayed, setIsDisplayed] = useState(false)

    const handleSignInDisplayClick = () => {
        setIsDisplayed(true)
    }

    return (
    <div id="nav-container">
        <div id="nav-buttons">
        <NavLink exact to="/" className="nav-buttons"><button id="draw-button">
            </button></NavLink>
        <NavLink to="/mydrawings" className="nav-buttons"><button id="pictures-button"></button></NavLink>
        </div>

        <button id="sign-in-button" onClick={handleSignInDisplayClick}>SIGN IN</button>

        {isDisplayed ? <SignIn /> : null}
    </div>

    )

}

export default NavBar; 