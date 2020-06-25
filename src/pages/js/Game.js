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
        this.state = {
            popUp: true,
            width: "100%"
        }
    }

    async getUsername() {
        if (this.props.location.state.username) {
            return this.props.location.state.username;
        }
    }

    async loadSocket() {
        const username = await this.getUsername()
        const socket = io("http://localhost:3333/", {
            query: {
                room: this.props.match.params.id,
                username
            }
        })
        const player = await api.post(`/rooms/${this.props.match.params.id}/players`, {
            username
        })
        socket.on("changeSong", ({ newSongUrl }) => {
            document.getElementById("audioSource").src = newSongUrl
        })
        socket.on("play", () => {
            document.getElementById("audio").play()
        })
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
        console.log("aaa")
        console.log(event)
    }

    handleTimeUpdate() {
        console.log("aaaaaaaaa")
        this.setState({width: ((30 - document.getElementById("audio").currentTime) / 30)*100 + "%"})

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
                            <div className="playerItem">
                                <img src={Bronze} className="icon" alt=""/>
                                <p className="name">Nome</p>
                                <p className="score">5</p>
                            </div>
                            <div className="playerItem">
                                <img src={Silver} className="icon" alt=""/>
                                <p className="name">Nome</p>
                                <p className="score">5</p>
                            </div>
                            <div className="playerItem">
                                <img src={Gold} className="icon" alt=""/>
                                <p className="name">Nome</p>
                                <p className="score">5</p>
                            </div>
                            <div className="playerItem">
                                <img className="icon" alt=""/>
                                <p className="name">Nome</p>
                                <p className="score">5</p>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="guessInput">
                            <input type="text" placeholder="Guess the song and the artist"/>
                            <div className="timeBar" id="timeBar"style={{width: this.state.width}}/>
                        </div>
                        <div className="songHistory">
                            <Song 
                                img="https://lojasaraiva.vteximg.com.br/arquivos/ids/2160871/1001074167.jpg?v=637007703586970000"
                                songTitle="Radioactive"
                                album="Nightvisions"
                                artist="Imagine Dragons"
                                songLink="https://www.youtube.com/watch?v=ktvTqknDobU"
                            />
                        </div>
                        <div className="chatArea">
                            <div className="textArea">
                                <p><span className="prefix">Otavio: </span>dasdasdasda</p>
                                <p>dasdasdasda</p>
                                <p>dasdasdasda</p>
                                <p>dasdasdasda</p>
                                <p>dasdasdasda</p>
                                <p>dasdasdasda</p>
                                <p>dasdasdasda</p>
                                <p>dasdasdasda</p>
                                <p>dasdasdasda</p>
                                <p>dasdasdasda</p>
                                <p>dasdasdasda</p>
                                <p>dasdasdasda</p>
                            </div>
                            <div className="inputArea">
                                <input type="text" className="chatInput" />
                                <input type="submit" className="chatSubmit" value="Send"/>
                            </div>
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