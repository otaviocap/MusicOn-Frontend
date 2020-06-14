import React from 'react';
import PropTypes from 'prop-types'

import "../css/Playlist.css"


export default class Playlist extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
    }


    render() {
        return (
            <div className="playlist-container" onClick={this.props.callback ? this.props.callback : ()=>{console.log("Callback not registered")}}>
                <div className="backgroundImage" style={{"backgroundImage": `url(${this.props.img})`}} />
                <div className="information">
                    <p>{this.props.name.length > 25 ? this.props.name.slice(0, 22)+"..." : this.props.name}</p>
                    {this.props.icon !== "" ? <p id="icon">{[...this.props.icon].length > 1 ? [...this.props.icon][0] : this.props.icon}</p> : null}
                </div>
                <div className="disc">
                        <div className="imgWrapper">
                            <img src={this.props.img} alt="" />
                        </div>
                    </div>
            </div>
        )
    }
}

Playlist.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    img: PropTypes.any,
    spotifyUrl: PropTypes.string,
    callback: PropTypes.func
}