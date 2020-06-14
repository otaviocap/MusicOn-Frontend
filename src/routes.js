import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Import pages Here
import LoginPage from './pages/js/Login'
import RegisterPage from './pages/js/Register'
import PlaylistChooser from './pages/js/PlaylistChooser'
import NotFound from './pages/js/NotFound'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route path="/:id/playlists" component={PlaylistChooser}/>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}