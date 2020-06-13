import React, { useState } from 'react'
import AnimatedBackground from '../../components/js/AnimatedBackground'
import Logo from '../../assets/svg/Logo.svg'
import {Link} from 'react-router-dom'

import "../css/Login.css"


export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    function handleSubmit(event) {
        event.preventDefault()
        console.log(username)
    }

    return (
        <div class="container">
            <div class="center">
                <img src={Logo} alt="MusicOn" />
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username" maxLength="20" 
                        value={username}
                        onChange={event => setUsername(event.target.value)} 
                        />
                        <input type="password" placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)} 
                        />
                        <input type="submit" value="Log In"/>
                        <Link to="/register">If you don't have an account please register</Link>
                    </form>
                </div>
            </div>
            <AnimatedBackground />
        </div>
    );
}