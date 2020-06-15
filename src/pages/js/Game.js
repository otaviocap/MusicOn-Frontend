import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Logo from '../../assets/svg/Logo.svg'
import Song from '../../components/js/SongObject'
import "../css/Game.css"

import Bronze from '../../assets/svg/trophies/Bronze.svg'
import Silver from '../../assets/svg/trophies/Silver.svg'
import Gold from '../../assets/svg/trophies/Gold.svg'
import AddPopup from '../../components/js/AddPopup'

export default function Game() {

    const [popUp, setPopUp] = useState(true)

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
            {popUp ? 
            <AddPopup 
                message="To invite your friends to this room, please send the url"
                buttonValue="Ok"
                fail={()=>{setPopUp(false)}}
            /> : null
            }
        </div>
    );
}