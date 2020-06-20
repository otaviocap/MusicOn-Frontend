import React, { useState } from 'react';
import PropTypes from 'prop-types'

import '../css/AddPopup.css'

export default function AddPopup({onSubmit, onExit, withForm, message, buttonValue}) {

    const [url, setUrl] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        const returned = await onSubmit(url)
        if (document.getElementById("error")) {
            document.getElementById("error").innerHTML = returned !== null ? returned : "" 
        }
        
    }

    return (
        <div className="addPopup-container">
            <div className="background" onClick={onExit}/>
            <div className="form-container">
                <p>{message}</p>
                {withForm ? 
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Spotify URL"
                        onChange={event => setUrl(event.target.value)}
                    />
                    <span className="error" id="error"></span>
                    <input type="submit" value={buttonValue}/>
                </form> : <input type="button" value={buttonValue} onClick={onExit}/>}
            </div>
        </div>
    )
}

AddPopup.prototype.propTypes = {
    onSubmit: PropTypes.func,
    onExit: PropTypes.func,
    withForm: PropTypes.bool,
    message: PropTypes.any,
    buttonValue: PropTypes.string,
}