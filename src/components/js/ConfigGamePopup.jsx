import React, { useState } from 'react';
import ConfigOption from './ConfigOption';
import PropTypes from 'prop-types'

import '../css/AddPopup.css'
import '../css/Playlist.css'
import '../css/ConfigGame.css'

export default function ConfigGamePopup({onPlay, onExit, onDelete, playlist}) {

    const [maxPlayers, setMaxplayers] = useState(2)
    const [maxScore, setMaxScore] = useState(30)

    return (
        <div className="addPopup-container back">
            <div className="background back" onClick={onExit}/>
            <div className="playlist-container middle moveUp">
                <div className="backgroundImage front" style={{"backgroundImage": `url(${playlist.img})`}} />
                <div className="information front">
                    <p>{playlist.name.length > 25 ? playlist.name.slice(0, 22)+"..." : playlist.name}</p>
                </div>
            </div>
            <div className="configs-container middle">
                <ConfigOption text="Max Players" stateFunction={setMaxplayers} state={maxPlayers} min={2} max={12} increment={1}/>
                <ConfigOption text="Max Score" stateFunction={setMaxScore} state={maxScore} min={30} max={150} increment={5}/>
            </div>
            <div className="buttons-container middle">
                <button id="delete" onClick={onDelete}>Delete</button>
                <button onClick={() => onPlay(maxPlayers, maxScore, playlist)}>Play</button>
            </div>
        </div>
    )
}

ConfigGamePopup.prototype.propTypes = {
    onPlay: PropTypes.func,
    onExit: PropTypes.func,
    onDelete: PropTypes.func,
    playlist: PropTypes.any
}