import React from 'react';
import PropTypes from 'prop-types'
import SpotifyLogo from '../../assets/svg/Spotify.svg'

import "../css/SongObject.css"

export default class SongObject extends React.Component {

    render() {
        return(
        <div className="song">
            <img src={this.props.img} alt="album art" id="albumArt"/>
            <div className="informationContainer">
                <p className="text">{this.props.artist} - {this.props.songTitle}</p>
                <p className="text">Album: {this.props.album}</p>
            </div>
            <a href={this.props.songLink} target="blank">
                <img src={SpotifyLogo} alt="" id="spotifyLogo" />
            </a>
        </div>);
    }

}

SongObject.propTypes = {
    img: PropTypes.any,
    artist: PropTypes.string,
    songTitle: PropTypes.string,
    album: PropTypes.string,
    songLink: PropTypes.string
}