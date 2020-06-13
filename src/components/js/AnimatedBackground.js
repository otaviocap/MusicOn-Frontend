import React from 'react';

import Wave1 from '../../assets/svg/waves/Wave1.svg';
import Wave2 from '../../assets/svg/waves/Wave2.svg';
import Wave3 from '../../assets/svg/waves/Wave3.svg';

import '../css/AnimatedBackground.css'

export default class AnimatedBackground extends React.Component {


    render() {
        return (
            <div class="waves">
                <img src={Wave1} alt=""/>
                <img src={Wave2} alt=""/>
                <img src={Wave3} alt=""/>
            </div>
        )
    }

}