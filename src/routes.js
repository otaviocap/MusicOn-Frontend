import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Import pages Here
import LoginPage from './pages/js/Login'
import RegisterPage from './pages/js/Register'
import PlaylistChooser from './pages/js/PlaylistChooser'
import GamePage from './pages/js/Game'
import EnterRoom from './pages/js/EnterRoom'
import NotFound from './pages/js/NotFound'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route exact path="/user/:id/" component={PlaylistChooser}/>
                <Route exact path="/game/:id/enter/" component={EnterRoom}/>
                <Route exact path="/game/:id/" component={GamePage}/>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}