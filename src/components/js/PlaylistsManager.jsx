import React from 'react';
import Playlist from './PlaylistObject'
import AddBackground from '../../assets/jpg/add-background.jpg'
import AddPopup from './AddPopup'
import PropTypes from 'prop-types'

import '../css/PlaylistManager.css'

export default class PlaylistManager extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            addPopup: false,
            playlists: [
                {
                    name: "Add",
                    icon: "+",
                    img: `${AddBackground}`,
                    callback: () => {this.setState({addPopup: true})}
                },
                {
                    name: "Rock",
                    icon: "🎸",
                    img:"https://upload.wikimedia.org/wikipedia/en/d/df/RedHotChiliPeppersCalifornication.jpg",
                    callback: ()=> {this.props.history.push("/game/:id/")}
                }
                
            ]
        }
    }

    addPlaylist(playlist) {
        this.setState({
            playlist: this.state.playlists.push(playlist)
        })
    }

    render() {
        const playlistsObjects = []
        for (const playlist of this.state.playlists) {
            playlistsObjects.push(
                <div className="itemWrapper" key={this.state.playlists.indexOf(playlist)}>
                    <div className="item">
                        <Playlist
                            name={playlist.name}
                            icon={playlist.icon}
                            img={playlist.img}
                            callback={playlist.callback} />
                    </div>
                </div>
            )
        }
        return(
            <div className="playlistManager-container">
                <div className="playlists" style={{"justifyContent": this.state.playlists.length > 4+1 ? "flex-start" : "center"}}>
                    {playlistsObjects}
                </div>
                {!this.state.addPopup ? null : 
                    <AddPopup 
                    message="To add an playlist, please copy the spotify URL and make sure the playlist is public"
                    buttonValue="Add"
                    fail={()=>{this.setState({addPopup: false})}}
                    success={(url)=>{console.log(url);this.setState({addPopup: false})}}
                    withForm
                    />
                }
            </div>
        )
    }
}

PlaylistManager.prototype.propTypes = {
    history: PropTypes.any
}