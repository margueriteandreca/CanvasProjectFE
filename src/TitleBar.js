import {useState} from "react"
import "./css/Title.css"
import SignInOrUp from "./SignInOrUp"

function TitleBar() {
    const [isDisplayed, setIsDisplayed] = useState(false)

    const handleSignInDisplayClick = () => {
        setIsDisplayed(true)
    }


    return (
        <div id="title-div">

            <h2 id="title" style={{color: "whitesmoke"}}>DrawTogether
            </h2>
            <button id="sign-in-button" onClick={handleSignInDisplayClick}>SIGN IN</button>

        {isDisplayed ? <SignInOrUp isDisplayed={isDisplayed} setIsDisplayed={setIsDisplayed}/> : null}   
            

        </div>
    )
}

export default TitleBar;



