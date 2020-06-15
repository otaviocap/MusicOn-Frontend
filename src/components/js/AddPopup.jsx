import React, { useState } from 'react';
import PropTypes from 'prop-types'

import '../css/AddPopup.css'

export default function AddPopup({success, fail, withForm, message, buttonValue}) {

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
                <p>{message}</p>
                {withForm ? 
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Spotify URL"
                        onChange={event => setUrl(event.target.value)}
                    />
                    <input type="submit" value={buttonValue}/>
                </form> : <input type="button" value={buttonValue} onClick={fail}/>}
            </div>
        </div>
    )
}

AddPopup.prototype.propTypes = {
    success: PropTypes.func,
    fail: PropTypes.func,
    withForm: PropTypes.bool,
    message: PropTypes.any,
    buttonValue: PropTypes.string
}