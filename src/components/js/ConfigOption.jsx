import React from 'react';
import PropTypes from 'prop-types';

import "../css/ConfigOption.css"

export default function ConfigOption({text, stateFunction, state, min, max, increment}) {

    return (
        <div className="option-container">
            <span className="option left">{text}</span>
            <button className="right" onClick={() => state - increment >= min ? stateFunction(state - increment) : null}>-</button>
            <span className="option right" id="value">{state}</span>
            <button className="right" onClick={() => state + increment <= max ? stateFunction(state + increment) : null}>+</button>
        </div>
    );
}

ConfigOption.propTypes = {
    text: PropTypes.string,
    stateFunction: PropTypes.func,
    state: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    increment: PropTypes.number
}