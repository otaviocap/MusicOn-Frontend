import React from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../assets/svg/Logo.svg'
import PlaylistManager from '../../components/js/PlaylistsManager'
import PropTypes from 'prop-types'

import '../css/Base.css'
    
export default function PlaylistChooser({history}) {
    return (
        <div className="container">
            <Link to="/" className="link">
                <img src={Logo} alt="MusicOn" id="logo"/>
            </Link>
            <PlaylistManager history={history}/>
        </div>
    )
}

PlaylistChooser.prototype.propTypes = {
    history: PropTypes.array
}