import { useEffect, useState } from "react";
import "./css/SignIn.css";
import { useCookies } from 'react-cookie';

function SignIn({ handleClickSignUp, onComplete }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [cookies, setCookie] = useCookies(['apiToken', 'userId', 'firstName', 'lastName']);

    const handleUsername = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    useEffect(() => {
        setUsername('');
        setPassword('');
        setErrorMessage('');
    }, [])

    const submitSignIn = (e) => {
        e.preventDefault();
        const logIn = {
            username,
            password
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
            .then(jsonResponse => {
                if (jsonResponse.success) {
                    setCookie('apiToken', jsonResponse.data.api_token)
                    setCookie('userId', jsonResponse.data.id)
                    setCookie('firstName', jsonResponse.data.first_name)
                    setCookie('lastName', jsonResponse.data.last_name)
                    setCookie('loginToggle', true);
                    setErrorMessage('');
                    onComplete();
                } else {
                    setErrorMessage('Invalid username/password!');
                }
            })
    }

    return (
        <div className="inner-sign-in">
            <h3>Sign in</h3>
            <form className="sign-in-form" id="sign-in-form" onSubmit={submitSignIn}>
                <input type="text" name="username" placeholder="username" onChange={handleUsername} value={username} />
                <input type="password" name="password" placeholder="password" onChange={handlePassword} value={password} />
                {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
                <input type="submit" name="signin" id="sign-in-submit" value="SIGN IN" />
            </form>
            <span>Don't have an account? </span><span id="sign-up-span" onClick={handleClickSignUp}>Sign Up</span>
        </div>
    )
}


export default SignIn;