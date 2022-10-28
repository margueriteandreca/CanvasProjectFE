import "./css/SignIn.css";
import { useState } from "react";
import { useCookies } from 'react-cookie';

function SignUp({ isSignIn, setIsSignIn }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [cookies, setCookie] = useCookies(['apiToken', 'userId', 'firstName', 'lastName']);

    const handleFirstName = (e) => setFirstName(e.target.value)
    const handleLastName = (e) => setLastName(e.target.value)
    const handleUsername = (e) => setUsername(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)



    const submitSignUp = (e) => {
        e.preventDefault();

        const newUser = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password: password
        }
        fetch("http://localhost:9292/create_user", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(jsonResponse => {
                if (jsonResponse.success) {
                    setIsSignIn(true)
                }
            })
    }

    return (
        <div className="inner-sign-in">
            <h3 id="create-account">Create an account:</h3>
            <form className="sign-in-form" id="sign-up-form" onSubmit={submitSignUp}>
                <div id="names"><input type="text" name="name" placeholder="First Name" onChange={handleFirstName} value={firstName} />
                <input type="text" name="name" placeholder="Last Name" onChange={handleLastName} value={lastName} /></div>
                <input type="text" name="name" placeholder="username" onChange={handleUsername} value={username} />
                <input type="text" name="name" placeholder="email" onChange={handleEmail} value={email} />
                <input type="password" name="name" placeholder="password" onChange={handlePassword} value={password} />
                <input type="submit" name="signin" id="sign-in-submit" value="SIGN UP" />
            </form>



        </div>
    )
}


export default SignUp;