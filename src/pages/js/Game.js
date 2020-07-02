import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Logo from '../../assets/svg/Logo.svg'
import Song from '../../components/js/SongObject'
import Api from '../../services/Api'
import io from 'socket.io-client'
import info from '../../Info'
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
        this.gotTheArtist = false
        this.needsToPlay = false
        this.gotTheSong = false
        this.state = {
            currentSong: {},
            popUp: true,
            width: "100%",
            players: [],
            messages: [
                {
                    message: "For text commands use /help in the chat",
                }
            ],
            songHistory: []
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
                        error: err.response.data.message
                    }
                }
                return this.props.history.push(nextLocation)
            }
            const socket = io(`http://${info.serverIp}:${info.severPort}/`, {
                query: {
                    roomId: this.props.match.params.id,
                    username
                }
            })
            this.socket = socket

            this.setState({
                "players": this.state.players.concat(roomResponse.data.players)
            })

            socket.on("startGame", (command) => {
                if (this.state.currentSong) {
                    this.state.songHistory.unshift(this.state.currentSong)
                }
                this.needsToPlay = true;
                this.gotTheArtist = false;
                this.gotTheSong = false;
                document.getElementById("guessInput").placeholder = "Guess the song and the artist"
                document.getElementById("guessInput").disabled = false
                this.state.players.forEach((player) => player.state = "none") 
                this.setState({currentSong: {
                    songTitle: command.songName,
                    img: command.img,
                    album: command.album,
                    artist: command.artist,
                    songLink: command.spotifyLink,
                    previewAudio: command.previewAudio
                }})
            })

            socket.on("addPlayer", (command) => {
                this.setState({
                    messages: this.state.messages.concat([{
                        message: `The player ${command.username} has connected the room`
                    }]),
                    players: this.state.players.concat([{
                    "username": command.username,
                    "state": "none",
                    "score": 0
                }])})
            })

            socket.on("removePlayer", (command) => {
                if (command.username) {
                    delete this.state.players[this.state.players.findIndex((item) => {if (item) { return item.username === command.username } else {return undefined}})]
                    this.setState({
                        messages: this.state.messages.concat([{
                            message: `The player ${command.username} has left the room`
                        }]),
                    })
                }
            })

            socket.on("newMessage", (command) => {
                console.log(command)
                this.setState({
                    messages: this.state.messages.concat({
                        message: command.message,
                        sender: command.sender
                    })
                })
            })

            socket.on("changeState", (command) => {
                const player = this.state.players[this.state.players.findIndex((item) => {if (item) { return item.username === command.username } else {return undefined}})]
                player.score = command.score
                player.state = command.state
                this.setState({players: this.state.players});
            })

            socket.on("winState", () => {
                const playersSorted = this.state.players.sort((a,b) => {return a.username > b.username ? 1 : a.username < b.username ? -1 : 0}).sort((a,b) => {return a.score - b.score})
                playersSorted.reverse()
                this.state.players.forEach((player) => player.score = 0)
                const winner = playersSorted.filter((player) => {if (player) {return player} else {return undefined}})
                const winMessages = [{
                    message: "We have the WINNERSS"
                },{
                    message: `1st place: ${winner[0].username}`
                },{
                    message: `2nd place: ${winner[1].username}`
                }, winner[2] ? {
                    message: `3rd place: ${winner[2].username}`
                } : {}, {
                    message: `The next match is starting soon`
                }]
                this.setState({
                    messages: this.state.messages.concat(winMessages),
                    players: this.state.players
                })
            })
        }
    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.disconnect()
        }
    }


    async componentDidUpdate() {
        if (this.lastMessageSize !== this.state.messages.length) {
            this.lastMessageSize = this.state.messages.length
            this.scrollDownTextArea()
        }
        if (this.needsToPlay) {
            this.needsToPlay = false
            document.getElementById("audio").play()
            document.getElementById("audio").muted = false
        }

    }

    async componentDidMount() {
        const guessResponse = document.getElementById("guessResponse")        
        guessResponse.addEventListener("animationend", () => {
            guessResponse.hidden = true
            guessResponse.style.webkitAnimationPlayState = "paused"
        })
        if (localStorage.getItem("volume")) {
            document.getElementById("audio").volume = localStorage.getItem("volume")
        } else {
            document.getElementById("audio").volume = ".05"
        }
    }

    async UNSAFE_componentWillMount() {
        const roomId = this.props.match.params.id
        try {
            const roomExists = await Api.get(`/rooms/${roomId}`)
            if (roomExists.status !== 404) {
                this.loadSocket()
                window.onbeforeunload = function(event) {
                    event.returnValue = "Reloading the page will make you lose all your points"
                }
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

    handleTextCommand(text) {
        const command = text.match(/\S+/g)
        switch(command[0]) {
            case "/volume":
                if (parseInt(command[1])){
                    localStorage.setItem("volume", parseInt(command[1])/100)
                    document.getElementById("audio").volume = parseInt(command[1])/100
                    this.setState({messages: this.state.messages.concat([{message: `Volume is set to ${command[1]}%`}])})
                } else {
                    this.setState({messages: this.state.messages.concat([{message: `You didn't give an value to volume or the value send is not a number`}])})
                }
                break;
            case "/help":
                this.setState({messages: this.state.messages.concat([
                    {message: ``},
                    {message: `Welcome to /help`},
                    {message: `/volume {value} | To change the volume of the song`},
                    {message: ``},
                    {message: ``},
                ])})
                break;
            default:
                this.setState({messages: this.state.messages.concat([
                    {message: `The command ${command[0]} doesn't exist  , please use /help to see all the commands`}
                ])})
        }
    }

    handleAnswer(event) {
        event.preventDefault()
        const guessResponse = document.getElementById("guessResponse")
        const guessInput = document.getElementById("guessInput")
        //I know checking in the user side is not the most secure, but this reduces the server process by a lot
        if ( Object.keys(this.state.currentSong).length !== 0 && this.state.currentSong.constructor === Object) {
            const input = guessInput.value.toLowerCase().replace(/[?!.']+/g, "")
            const formattedSongTitle = this.state.currentSong.songTitle.slice(0, this.state.currentSong.songTitle.indexOf("(") === -1 ? this.state.currentSong.songTitle.length : this.state.currentSong.songTitle.indexOf("(")).trim().replace(/[?!.']+/g, "")
            if ( input === this.state.currentSong.artist.toLowerCase() && !this.gotTheArtist) {
                this.gotTheArtist = true
                guessResponse.innerHTML = "Correct"
                if (guessResponse.classList.contains("wrong")) {
                    guessResponse.classList.remove("wrong")
                } 
                if (!guessResponse.classList.contains("correct")) {
                    guessResponse.classList.add("correct")
                } 
                this.socket.emit("correctAnswer", {
                    correct: "artist"
                })
            } else if (input === formattedSongTitle.toLowerCase() && !this.gotTheSong) {
                this.gotTheSong = true
                guessResponse.innerHTML = "Correct"
                if (guessResponse.classList.contains("wrong")) {
                    guessResponse.classList.remove("wrong")
                } 
                if (!guessResponse.classList.contains("correct")) {
                    guessResponse.classList.add("correct")
                } 
                this.socket.emit("correctAnswer")
            } else {
                guessResponse.innerHTML = "Wrong"
                if (!guessResponse.classList.contains("wrong")) {
                    guessResponse.classList.add("wrong")
                } 
                if (guessResponse.classList.contains("correct")) {
                    guessResponse.classList.remove("correct")
                } 
            }
            if (this.gotTheSong && this.gotTheArtist) {
                guessInput.placeholder = "You got everything right. NICE"
                guessInput.disabled = true
            }
            guessResponse.hidden = false
            guessResponse.style.webkitAnimationPlayState = "running"
        }
        guessInput.value = ""
    }

    handleTimeUpdate() {
        this.setState({width: ((30 - document.getElementById("audio").currentTime) / 30)*100 + "%"})
    }

    handlePause(seconds) {
        this.setState({width: ((4.5 - seconds) / 4.5)*100 + "%"})
        if (seconds !== 0) {
            setTimeout(() => {this.handlePause(seconds-.25)}, 250)
        }
    }

    handleSendMessages(event) {
        event.preventDefault()
        const text = document.getElementById("text").value
        document.getElementById("text").value = ""
        if (text.startsWith("/")) {
            this.handleTextCommand(text)
            return;
        }
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
        const playersSorted = this.state.players.sort((a,b) => {return a.username > b.username ? 1 : a.username < b.username ? -1 : 0}).sort((a,b) => {return a.score - b.score})
        playersSorted.reverse()
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
        const songOrder = this.state.songHistory
        for (const song of songOrder) {
            if (song.img) {
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
        }
        return songsToRender
    }

    render() {
        return (
            <div className="container">
                <audio
                    onTimeUpdate={() => this.handleTimeUpdate()} 
                    onEnded={() => {this.handlePause(4.5)}}
                    id="audio" 
                    src={this.state.currentSong.previewAudio ? this.state.currentSong.previewAudio : ""} 
                />
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
                        <form autoComplete="off" autoCorrect="off" className="guessInput" onSubmit={(event) => {this.handleAnswer(event)}}>
                            <input type="text" id="guessInput" placeholder="Guess the song and the artist"/>
                            <div className="timeBar" id="timeBar"style={{width: this.state.width}}/>
                            <div className="guessResponse correct" id="guessResponse" hidden>Correct</div>
                        </form>
                        <div className="songHistory">
                            {this.renderSongHistory()}
                        </div>
                        <div className="chatArea">
                            <div className="textArea" id="textArea">
                                {this.renderMessages()}
                            </div>
                            <form className="inputArea">
                                <input autoComplete="off" autoCorrect="off" type="text" className="chatInput" id="text"/>
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