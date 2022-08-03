import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";


import "./css/Nav.css"
import "./css/SignIn.css"



function SignInOrUp({isDisplayed, setIsDisplayed}) {
    const [isSignIn, setIsSignIn] = useState(true)


    const handleClickSignUp = () => {
        setIsSignIn(false)
    }

    const handleClickClose = () => {
        setIsDisplayed(false)
    }
    

    return (
        <div id="sign-in-container">
            <button id="close-button" onClick={handleClickClose}>x</button>
            {isSignIn ? <SignIn handleClickSignUp={handleClickSignUp}/> : <SignUp isSignIn={isSignIn} setIsSignIn={setIsSignIn}/>}
            
            
        </div>
    )

}

export default SignInOrUp;