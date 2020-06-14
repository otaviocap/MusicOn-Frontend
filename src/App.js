import React from 'react';

import Routes from './routes'

import './App.css'
import AnimatedBackground from './components/js/AnimatedBackground';

export default function App() {
    return (
        <div>
            <Routes />
            <AnimatedBackground />
        </div>
    );
}