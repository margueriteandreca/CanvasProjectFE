import { useState } from "react";
import "./css/Nav.css"
import "./css/SignIn.css"



function SignIn({isDisplayed, setIsDisplayed}) {
    const [isSignIn, setIsSignIn] = useState(true)


    const handleClick = () => {
        setIsSignIn(false)
    }
    

    return (
        <div id="sign-in-container">
            <form id="sign-in-form">
            <input type="text" name="name" placeholder="email"/>
            <input type="text" name="name" placeholder="password"/>
            </form>
            <span>Don't have an account? </span><span onClick={handleClick}>Sign Up</span>
            
        </div>
    )

}

export default SignIn;