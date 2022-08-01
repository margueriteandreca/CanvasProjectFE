import {useState} from "react"
import "./css/Title.css"
import SignIn from "./SignIn"

function TitleBar() {
    const [isDisplayed, setIsDisplayed] = useState(false)

    const handleSignInDisplayClick = () => {
        setIsDisplayed(true)
    }


    return (
        <div id="title-div">

            <h2 id="title">TITLE???
            </h2>
            <button id="sign-in-button" onClick={handleSignInDisplayClick}>SIGN IN</button>

        {isDisplayed ? <SignIn /> : null}   
            

        </div>
    )
}

export default TitleBar;



