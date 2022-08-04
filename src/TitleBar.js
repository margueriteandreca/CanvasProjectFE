import { useState } from "react"
import "./css/Title.css"
import SignInOrUp from "./SignInOrUp"
import { useCookies } from 'react-cookie';

function TitleBar() {
    const [isDisplayed, setIsDisplayed] = useState(false)

    const [cookies, setCookie, removeCookie] = useCookies(['apiToken', 'userId', 'firstName', 'lastName']);

    const handleSignInDisplayClick = () => {
        setIsDisplayed(true)
    }

    const handleLogout = () => {
        removeCookie('apiToken');
        removeCookie('userId');
        removeCookie('firstName');
        removeCookie('lastName');
        setCookie('loginToggle', !cookies.loginToggle);
    }


    return (
        <div id="title-div">

            <h2 id="title" style={{ color: "whitesmoke" }}>DrawTogether</h2>
            {cookies.apiToken
                ? <button id="sign-in-button" onClick={handleLogout}>Sign Out</button>
                : <button id="sign-in-button" onClick={handleSignInDisplayClick}>Sign In</button>}
            {isDisplayed ? <SignInOrUp isDisplayed={isDisplayed} setIsDisplayed={setIsDisplayed} /> : null}
            <div>
            {cookies.apiToken? `Welcome back ${cookies.lastName} ${cookies.firstName}`: null}
            </div>


        </div>
    )
}

export default TitleBar;



