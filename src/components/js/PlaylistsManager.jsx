import React from 'react';
import Playlist from './PlaylistObject'
import AddBackground from '../../assets/jpg/add-background.jpg'
import AddPopup from './AddPopup'
import PropTypes from 'prop-types'
import api from '../../services/Api'

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
                    playlistId: "0",
                    callback: () => {this.setState({addPopup: true})}
                },
                
            ]
        }
    }

    async handlePlaylistRemove(playlistId) {
        try {
            const playlist = await api.delete(`/users/${this.props.userId}/playlists/${playlistId}`)
            console.log(playlist)
            this.setState({playlists: this.state.playlist.filter((item) => item.id !== playlistId)})
        } catch (err) {
            console.log(err.response)
        }
    }

    async componentDidMount() {
        const playlistsInfo = await api.get(`/users/${this.props.userId}/playlists/`)
        const newPlaylists = []
        for (const playlist of playlistsInfo.data) {
            newPlaylists.push({
                name: playlist.name,
                icon: "",
                img: playlist.image,
                playlistId: playlist._id,
                callback: () => {this.props.history.push(`/game/${playlist._id}`)},
            })
        }
        this.setState({playlists: this.state.playlists.concat(newPlaylists)})
    }

    async handlePlaylistAdd(url) {
        if (url.match(/(?<!=)[A-Za-z0-8]{22}/g)) {
            try {
                const playlist = await api.post(`/users/${this.props.userId}/playlists`, {
                    spotifyUrl: url
                })
                console.log(playlist)
                this.setState({addPopup: false})
            } catch (err) {
                console.log(err.response)
                return err.response.data
            }
        } 
        return "URL is invalid"
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
                    onExit={()=>{this.setState({addPopup: false})}}
                    onSubmit={(url) => {return this.handlePlaylistAdd(url)}}
                    withForm
                    />
                }
            </div>
        )
    }
}

PlaylistManager.propTypes = {
    history: PropTypes.any,
    userId: PropTypes.string
}