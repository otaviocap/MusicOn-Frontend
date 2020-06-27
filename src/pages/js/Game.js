import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Logo from '../../assets/svg/Logo.svg'
import Song from '../../components/js/SongObject'
import Api from '../../services/Api'
import io from 'socket.io-client'
import "../css/Game.css"

import Bronze from '../../assets/svg/trophies/Bronze.svg'
import Silver from '../../assets/svg/trophies/Silver.svg'
import Gold from '../../assets/svg/trophies/Gold.svg'
import AddPopup from '../../components/js/AddPopup'
import api from '../../services/Api'

export default class Game extends React.Component {

    constructor(props) {
        super(props)
        this.lastMessageSize = 0
        this.socket = undefined;
        this.state = {
            popUp: false,
            width: "100%",
            players: [],
            messages: [
                {
                    message: "dsadsds",
                    sender: "otavio"
                }
            ],
            songHistory: [
                {
                    img: "https://lojasaraiva.vteximg.com.br/arquivos/ids/2160871/1001074167.jpg?v=637007703586970000",
                    songTitle: "Radioactive",
                    album: "Nightvisions",
                    artist: "Imagine Dragons",
                    songLink: "https://www.youtube.com/watch?v=ktvTqknDobU",
                }
            ]
        }
    }

    getUsername() {
        try {
            if (this.props.location.state.username) {
                return this.props.location.state.username;
            }
        } catch (err) {
            const pathname = this.props.location.pathname
            if (pathname.endsWith("/")) {
                this.props.history.push(pathname + "enter")
            } else {
                this.props.history.push(pathname + "/enter")
            }   
        }
    }

    async loadSocket() {
        const username = await this.getUsername()
        if (username) {
            let roomResponse;
            try {
                roomResponse = await api.post(`/rooms/${this.props.match.params.id}/players`, {
                    username
                })
            } catch(err) {
                const nextLocation = {
                    pathname: this.props.location.pathname + "/enter",
                    state: {
                        error: "User already in the room"
                    }
                }
                return this.props.history.push(nextLocation)
            }
            const socket = io("http://localhost:3333/", {
                query: {
                    roomId: this.props.match.params.id,
                    username
                }
            })
            this.socket = socket

            this.setState({
                "players": this.state.players.concat(roomResponse.data.players)
            })

            socket.on("changeSong", ({ newSongUrl }) => {
                document.getElementById("audioSource").src = newSongUrl
            })

            socket.on("play", () => {
                document.getElementById("audio").play()
            })

            socket.on("addPlayer", (command) => {
                this.setState({
                    players: this.state.players.concat([{
                    "username": command.username,
                    "state": "none",
                    "score": 0
                }])})
            })

            socket.on("removePlayer", (commmand) => {
                delete this.state.players[this.state.players.findIndex((item) => item.username === commmand.username)]
                this.setState()
            })

            socket.on("newMessage", (command) => {
                this.setState({
                    messages: this.state.messages.concat({
                        message: command.message,
                        sender: command.sender
                    })
                })
            })
        }
    }


    async componentDidUpdate() {
        if (this.lastMessageSize !== this.state.messages.length) {
            this.lastMessageSize = this.state.messages.length
            this.scrollDownTextArea()
        }
    }

    async UNSAFE_componentWillMount() {
        const roomId = this.props.match.params.id
        try {
            const roomExists = await Api.get(`/rooms/${roomId}`)
            if (roomExists.status !== 404) {
                this.loadSocket()
            }
        } catch(err) {
            if (err.response) {
                console.log(err.response)
            } else {
                console.log(err)
            }
            this.props.history.push("/notFound")
        }
    }

    handleAudio(event) {
    }

    handleTimeUpdate() {
        this.setState({width: ((30 - document.getElementById("audio").currentTime) / 30)*100 + "%"})

    }

    handleSendMessages(event) {
        event.preventDefault()
        const text = document.getElementById("text").value
        document.getElementById("text").value = ""
        if (this.socket) {
            this.socket.emit("newMessage", {
                message: text,
                sender: this.getUsername(),
                roomId: this.props.match.params.id
            })
        }

    }

    scrollDownTextArea() {
        const textArea = document.getElementById("textArea")
        textArea.scrollTop = textArea.scrollHeight
    }


    renderPlayers() {
        const playersToRender = []
        const playersSorted = this.state.players.sort((a,b) => {return a.score - b.score}).sort((a,b) => {return a.username > b.username ? 1 : a.username < b.username ? -1 : 0})
        playersSorted.reverse()
        console.log(playersSorted)
        for (const player of playersSorted) {
            if (player) {
                let icon;
                let color;
                switch(player.state) {
                    case "first":
                        color = "Gold"
                        icon = Gold
                        break
                    case "second":
                        color = "Gray"
                        icon = Silver
                        break
                    case "third":
                        color = "DarkOrange"
                        icon = Bronze
                        break
                    case "both":
                        color = "Olive"
                        break
                    case "one":
                        color = "Salmon"
                        break
                    default:
                        color = ""
                        icon = ""
                        break
                }
                playersToRender.push(
                    <div className="playerItem" key={this.state.players.indexOf(player)}>
                        <img src={icon ? icon : ""} className="icon" alt=""/>
                        <p className="name" style={{"color": color ? color : ""}}>{player.username}</p>
                        <p className="score" style={{"color": color ? color : ""}}>{player.score}</p>
                    </div>
                )
            }
        }
        return playersToRender
    }

    renderMessages() {
        const messagesToRender = []
        for (const message of this.state.messages) {
            messagesToRender.push(
                message.sender ? 
                <div key={this.state.messages.indexOf(message)}><p><span className="prefix">{message.sender}: </span>{message.message}</p></div> :
                <div key={this.state.messages.indexOf(message)}><p>{message.message}</p></div>
            )
        }
        return messagesToRender
    }

    renderSongHistory() {
        const songsToRender = []
        for (const song of this.state.songHistory) {
            songsToRender.push(
                <Song key={this.state.songHistory.indexOf(song)}
                    img={song.img}
                    songTitle={song.songTitle}
                    album={song.album}
                    artist={song.artist}
                    songLink={song.songLink}
                />
            )
        }
        return songsToRender
    }

    render() {
        return (
            <div className="container">
                <audio hidden autoPlay onDurationChange={this.handleAudio} onTimeUpdate={() => {this.handleTimeUpdate()}} id="audio">
                    <source id="audioSource" src={"https://p.scdn.co/mp3-preview/6f4f720769b162516cde512671b0c339cc37932c?cid=774b29d4f13844c495f206cafdad9c86"} />
                </audio>
                <Link to="/" className="link">
                    <img src={Logo} alt="MusicOn" id="logo"/>
                </Link>
                <div className="gameContainer">
                    <div className="column">
                        <div className="playerlist">
                            {this.renderPlayers()}
                        </div>
                    </div>
                    <div className="column">
                        <div className="guessInput">
                            <input type="text" placeholder="Guess the song and the artist"/>
                            <div className="timeBar" id="timeBar"style={{width: this.state.width}}/>
                        </div>
                        <div className="songHistory">
                            {this.renderSongHistory()}
                        </div>
                        <div className="chatArea">
                            <div className="textArea" id="textArea">
                                {this.renderMessages()}
                            </div>
                            <form className="inputArea">
                                <input type="text" className="chatInput" id="text"/>
                                <input type="submit" className="chatSubmit" value="Send" onClick={(event) => this.handleSendMessages(event)}/>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.popUp ? 
                <AddPopup 
                    message="To invite your friends to this room, please send the url"
                    buttonValue="Ok"
                    onExit={()=>{this.setState({popUp: false})}}
                /> : null
                }
            </div>
        );
    }
}

Game.propTypes = {
    history: PropTypes.any,
    match: PropTypes.any,
    location: PropTypes.any
}