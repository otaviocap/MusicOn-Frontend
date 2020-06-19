import React, { useState } from 'react';
import Logo from '../../assets/svg/Logo.svg';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Crypto from 'crypto'
import api from '../../services/Api';

import '../css/Base.css'

export default function RegisterPage({history}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    
    async function handleSubmit(event) {
        event.preventDefault()

        const hashedPassword = Crypto.createHash('sha256').update(password).digest("hex")

        if (email.match(/\S+@\S+\.\S+/g)) {
            try {
                const createdUser = await api.post("/users/", {
                    username,
                    email,
                    "password": hashedPassword
                })
                console.log(createdUser)
        
                history.push(`/user/${createdUser.data._id}`)
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
                <Link to="/" className="link">
                    <img src={Logo} alt="MusicOn" id="logo"/>
                </Link>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" autoComplete="username" aria-label="username"
                    onChange={event => setUsername(event.target.value)}
                    />
                    <input type="text" placeholder="Email" autoComplete="email" aria-label="email"
                    onChange={event => setEmail(event.target.value)}
                    />
                    <input type="password" placeholder="Password" autoComplete="password" aria-label="password"
                    onChange={event => setPassword(event.target.value)}
                    />
                    <span className="error" id="error"></span>
                    <input type="submit" value="Register" />
                </form>
            </div>
        </div>
    );

}

RegisterPage.prototype.propTypes = {
    history: PropTypes.any
}