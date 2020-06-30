import React from 'react';
import Playlist from './PlaylistObject'
import AddBackground from '../../assets/jpg/add-background.jpg'
import AddPopup from './AddPopup'
import ConfigGamePopup from './ConfigGamePopup'
import PropTypes from 'prop-types'
import api from '../../services/Api'

import '../css/PlaylistManager.css'

export default class PlaylistManager extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            addPopup: false,
            configPopup: false,
            selectedPlaylistId: "",
            playlists: [
                {
                    name: "Add",
                    icon: "+",
                    img: `${AddBackground}`,
                    spotifyId: "0",
                    dbId: "0",
                    callback: () => {this.setState({addPopup: true})}
                },
                
            ]
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
                spotifyId: playlist.spotifyId,
                dbId: playlist._id
                //this.props.history.push(`/game/${playlist._id}`)
            })
        }
        this.setState({playlists: this.state.playlists.concat(newPlaylists)})
    }

    async handleStartGame(maxPlayers, maxScore, playlist) {
        try {
            console.log(playlist)
            const room = await api.post("/rooms/", {
                "playlistId": playlist.dbId,
                maxPlayers,
                maxScore
            })
            const user = await api.get(`/users/${this.props.userId}`)
            const location = {
                pathname: `/game/${room.data.roomId}/`,
                state: {
                    username: user.data.username
                }
            }
            console.log(room, location)
            this.props.history.push(location)
        } catch (err) {
            if (err.response) {
                console.log(err.response)
            } else {
                console.log(err)
            }
        }
    }

    async handlePlaylistRemove(playlist) {
        console.log(playlist)
        try {
            await api.delete(`/users/${this.props.userId}/playlists/${playlist.spotifyId}`)
            this.setState({configPopup: false, selectedPlaylistId: "", playlists: this.state.playlists.filter((item) => item.dbId !== playlist.dbId)})
        } catch (err) {
            if (err.response) {
                console.log(err.response)
            } else {
                console.log(err)
            }
        }
    }

    async handlePlaylistAdd(url) {
        if (url.match(/[A-Za-z0-8]{22}/g)) {
            try {
                const playlist = await api.post(`/users/${this.props.userId}/playlists`, {
                    spotifyUrl: url
                })
                console.log(playlist)
                this.setState({addPopup: false, playlists: this.state.playlists.concat([{
                    name: playlist.data.playlistInfo.name,
                    icon: "",
                    img: playlist.data.playlistInfo.image,
                    spotifyId: playlist.data.playlistInfo.spotifyId,
                    dbId: playlist.data.playlistInfo._id,
                    callback: () => {this.setState({configPopup: true, selectedPlaylistId: playlist.data.playlistInfo.spotifyId})},
                }])})
                return null
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
                            callback={() => playlist.name === "Add" ? playlist.callback() : this.setState({configPopup: true, selectedPlaylistId: playlist.spotifyId})} />
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
                {!this.state.configPopup ? null : <ConfigGamePopup 
                    onExit={()=>{this.setState({configPopup: false, selectedPlaylistId: ""})}}
                    onPlay={(maxPlayers, maxScore, playlist) => this.handleStartGame(maxPlayers, maxScore, playlist)}
                    onDelete={() => this.handlePlaylistRemove(this.state.playlists.find((item) => item.spotifyId === this.state.selectedPlaylistId))}
                    playlist={this.state.playlists.find((item) => item.spotifyId === this.state.selectedPlaylistId)}
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