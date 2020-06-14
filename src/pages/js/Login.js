import React, { useState } from 'react'
import Logo from '../../assets/svg/Logo.svg'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import "../css/Base.css"


export default function LoginPage({ history }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    function handleSubmit(event) {
        event.preventDefault()
        history.push(`/${username}/playlists`);
    }

    return (
        <div className="container">
            <div className="form-container">
                <img src={Logo} alt="MusicOn" id="logo"/>
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
                    <Link to="/register">If you don&apos;t have an account please register</Link>
                </form>
            </div>
        </div>
    );
}
LoginPage.prototype.propTypes = {
    history: PropTypes.array
}