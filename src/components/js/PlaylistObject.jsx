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
            <div className="playlist-container">
                <div className="information" style={{"background": `linear-gradient(45deg, ${this.props.color1} 0%, ${this.props.color2} 100%)`}}>
                    <p>{this.props.name.length > 25 ? this.props.name.slice(0, 22)+"..." : this.props.name}</p>
                    <p>{this.props.name.length > 25 ? this.props.name.slice(0, 22)+"..." : this.props.name}</p>
                    <p>{this.props.name.length > 25 ? this.props.name.slice(0, 22)+"..." : this.props.name}</p>
                    
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
    img: PropTypes.object,
    color1: PropTypes.any,
    color2: PropTypes.any
}