import React from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../assets/svg/Logo.svg'
import Playlist from '../../components/js/PlaylistObject'

import '../css/Base.css'
import '../css/PlaylistPage.css'

export default function createPlaylistChooser() {
    return (
        <div className="container">
            <Link to="/" className="link">
                <img src={Logo} alt="MusicOn" id="logo"/>
            </Link>
            <div className="playlists">
                <div className="item">
                    <Playlist 
                            color1="#287d3f" 
                            color2="#b44dd6" 
                            name="Sadness in personssssasdaaaaaaaaaaaaaaa" 
                            img="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                        />
                </div>
                <div className="item">
                    <Playlist 
                            color1="#287d3f" 
                            color2="#b44dd6" 
                            name="Sadness in personssssasdaaaaaaaaaaaaaaa" 
                            img="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                        />
                </div>
                <div className="item">
                    <Playlist 
                            color1="#287d3f" 
                            color2="#b44dd6" 
                            name="Sadness in personssssasdaaaaaaaaaaaaaaa" 
                            img="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                        />
                </div>
                <div className="item">
                    <Playlist 
                            color1="#287d3f" 
                            color2="#b44dd6" 
                            name="Sadness in personssssasdaaaaaaaaaaaaaaa" 
                            img="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                        />
                </div>
                <div className="item">
                    <Playlist 
                            color1="#287d3f" 
                            color2="#b44dd6" 
                            name="Sadness in personssssasdaaaaaaaaaaaaaaa" 
                            img="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                        />
                </div>
                <div className="item">
                    <Playlist 
                            color1="#287d3f" 
                            color2="#b44dd6" 
                            name="Sadness in personssssasdaaaaaaaaaaaaaaa" 
                            img="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                        />
                </div>
            </div>
        </div>
    )
}