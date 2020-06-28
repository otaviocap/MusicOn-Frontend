import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/Api';
import PropTypes from 'prop-types';

import logo from '../../assets/svg/Logo.svg'

import '../css/Base.css'


export default function EnterRoomPage({history, location, match}) {

    const [username, setUsername] = useState("");

    async function handleSubmit(event) {
        event.preventDefault()
        const nextLocation = {
            pathname: location.pathname.slice(0, -"/enter".length),
            state: {
                username
            }
        }
        history.push(nextLocation)
    }

    function CheckError() {
        if (location.state) { 
            if (location.state.error) {
                return <span className="error" id="error"> {location.state.error} </span>
            }
        }
        return null
    }

    return (
        <div className="container">
            <div className="form-container">
                <Link to="/" className="link">
                    <img src={logo} alt="MusicOn" id="logo"/>
                </Link>
                <form onSubmit={handleSubmit}>
                    <p>To enter in the room please input your username</p>
                    <input className="add-margin" type="text" placeholder="Username" autoComplete="username" aria-label="username"
                    onChange={event => setUsername(event.target.value)}
                    /> 
                    <CheckError/>
                    <input type="submit" value="Enter" />
                </form>
            </div>
    </div>
    )
}

EnterRoomPage.prototype.propTypes = {
    history: PropTypes.any,
    location: PropTypes.any,
    match: PropTypes.any
}