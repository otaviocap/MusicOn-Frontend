import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Import pages Here
import LoginPage from './pages/js/Login'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={LoginPage}/>
        </BrowserRouter>
    )
}