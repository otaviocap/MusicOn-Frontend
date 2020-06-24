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

export default class Game extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            popUp: true
        }
    }

    async getUsername() {
        const query = new URLSearchParams(this.props.location.search)
        let username;
        if (this.props.location.state.username) {
            username = this.props.location.state.username;
        } else {
            if (query.get("username")) {
                username = query.get("username")
            } else {
                console.log("username not found")
            }
        }
        return username
    }

    async loadSocket() {
        

    }

    async UNSAFE_componentWillMount() {
        const roomId = this.props.match.params.id
        try {
            const roomExists = await Api.get(`/rooms/${roomId}`)
            console.log(roomExists)
            if (roomExists.status !== 404) {
                console.log("Room exists")
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

    render() {
        return (
            <div className="container">
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
                            <div className="timeBar"/>
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