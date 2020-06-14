import React, { useState } from 'react';
import Logo from '../../assets/svg/Logo.svg';
import {Link} from 'react-router-dom';

import '../css/Base.css'

export default function RegisterPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    
    function handleSubmit(event) {
        event.preventDefault()
        console.log(username, password, email)

    }


    return (
        <div className="container">
            <div className="form-container">
                <Link to="/" className="link">
                    <img src={Logo} alt="MusicOn" id="logo"/>
                </Link>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" autoComplete="username" aria-label="username" prefix="teste"
                    onChange={event => setUsername(event.target.value)}
                    />
                    <input type="text" placeholder="Email" autoComplete="email" aria-label="email"
                    onChange={event => setEmail(event.target.value)}
                    />
                    <input type="password" placeholder="Password" autoComplete="password" aria-label="password"
                    onChange={event => setPassword(event.target.value)}
                    />
                    <input type="submit" value="Register" />
                </form>
            </div>
        </div>
    );

}
