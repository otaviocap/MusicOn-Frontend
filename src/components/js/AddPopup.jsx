import React, { useState } from 'react';
import PropTypes from 'prop-types'

import '../css/AddPopup.css'

export default function PlaylistManager({success, fail}) {

    const [url, setUrl] = useState("")

    function handleSubmit(event) {
        event.preventDefault()
        //check the playlist
        let ok = true
        ok ? success(url) : fail()
        
    }

    return (
        <div className="addPopup-container">
            <div className="background" onClick={fail}/>
            <div className="form-container">
                <p>To add an playlist, please copy the spotify URL and make sure the playlist is <u><b>public</b></u></p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Spotify URL"
                        onChange={event => setUrl(event.target.value)}
                    />
                    <input type="submit" value="Add" />
                </form>
            </div>
        </div>
    )
}

PlaylistManager.prototype.propTypes = {
    success: PropTypes.func,
    fail: PropTypes.func
}