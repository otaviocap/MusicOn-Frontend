import React from 'react';
import logo from '../../assets/svg/Logo.svg'
import { Link } from 'react-router-dom'

import "../css/Base.css"

export default function NotFoundPage() {
    return (
    <div className="container">
        <Link to="/" className="link">
            <img src={logo} alt="MusicOn" id="logo"/>
        </Link>
        <p>Error 404</p>
        <p>Page not found</p>
    </div>
    )
}