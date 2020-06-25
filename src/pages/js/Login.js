import React, { useState } from 'react'
import Logo from '../../assets/svg/Logo.svg'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Api from '../../services/Api'
import Crypto from 'crypto'

import "../css/Base.css"


export default function LoginPage({ history }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    async function handleSubmit(event) {
        event.preventDefault()

        const hashedPassword = Crypto.createHash('sha256').update(password).digest("hex")

        if (email.match(/\S+@\S+\.\S+/g)) {
            try {
                const user = await Api.post("/auth/", {
                    "email": email,
                    "password": hashedPassword
                })
                console.log(user)
        
                history.push(`/user/${user.data._id}`)
                return
            } catch (err) {
                console.log(err.response)
                document.getElementById("error").innerHTML = err.response.data.message
                return
            }
        }
        document.getElementById("error").innerHTML = "Invalid Email"
    }

    return (
        <div className="container">
            <div className="form-container">
                <img src={Logo} alt="MusicOn" id="logo"/>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" autoComplete="email"
                    onChange={event => setEmail(event.target.value)}
                    />
                    <input type="password" placeholder="Password" autoComplete="password"
                    onChange={event => setPassword(event.target.value)}
                    />
                    <span className="error" id="error"></span>
                    <input type="submit" value="Log In"/>
                    <Link to="/register">If you don&apos;t have an account please register</Link>
                </form>
            </div>
        </div>
    );
}
LoginPage.prototype.propTypes = {
    history: PropTypes.array
}