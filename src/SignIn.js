import { useState } from "react";
import "./css/SignIn.css";

function SignIn({ handleClickSignUp }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const submitSignIn = (e) => {
        e.preventDefault();
        setUsername(e.target.username.value);
        setPassword(e.target.password.value);
        const logIn = {
            username: username,
            password: password
        }
        fetch("http://localhost:9292/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(logIn)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }





    return (
        <div className="inner-sign-in">
            <h3>Sign in</h3>
            <form className="sign-in-form" id="sign-in-form" onSubmit={submitSignIn}>
                <input type="text" name="username" placeholder="username" />
                <input type="text" name="password" placeholder="password" />
                <input type="submit" name="signin" id="sign-in-submit" value="SIGN IN" />
            </form>
            <span>Don't have an account? </span><span id="sign-up-span" onClick={handleClickSignUp}>Sign Up</span>
        </div>
    )
}


export default SignIn;