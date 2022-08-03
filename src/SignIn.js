import { useState } from "react";
import "./css/SignIn.css";

function SignIn({handleClickSignUp}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const submitSignIn = (e) => {
        e.preventDefault();
        const logIn = {
            username: username,
            password: password
        }
    }




    return (
        <div className="inner-sign-in">
            <h3>Sign in</h3>
            <form className="sign-in-form" id="sign-in-form" onSubmit={submitSignIn}>
                    <input type="text" name="username" placeholder="username"/>
                    <input type="text" name="password" placeholder="password"/>
                    <input type="submit" name="signin" id="sign-in-submit" value="SIGN IN"/>
            </form>
            <span>Don't have an account? </span><span id="sign-up-span" onClick={handleClickSignUp}>Sign Up</span>
        </div>
    )
}


export default SignIn;