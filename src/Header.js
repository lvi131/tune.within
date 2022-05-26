import React from 'react'
import './Header.css'
import {loginUrl} from './spotify'
import headphone from './images/headphone.png'
import focus from './images/focus.png'

function Header() {
  return (
    <div>
        <div className='header'>
            <h1 className='header-heading'>Relax.Refresh.
                <span className='header-heading-part'>Reconnect.</span>
            </h1>
            <p className='header-description'>
                Be it the end of a stressful day or the beginning of a 
                beautiful one, tune.[with]in is here to help you take care 
                of your emotional health and boost your productivity.
            </p>
        </div>
        <div className='header-card'>
            <div className='header-card-listen'>
                <p className='header-option-listen'>
                    Experience a new way of listening with personalized emotion 
                    based recommendations.
                </p>
                <a href={loginUrl} className="header-button">Log In With Spotify</a>
                <img src={headphone} alt="headphone" className="header-image-listen"/>
            </div>
            <div className='header-card-focus'>
                <p className='header-option-focus'>
                    Let it all go and calm your mind with nature - the perfect
                    companion for productive work and relaxation. 
                </p>
                <a href="/focus" className="header-button">Relax And Focus</a>
                <img src={focus} alt="girl relaxing on beach" className="header-image-focus"/>
            </div>
        </div>
    </div>
  )
}

export default Header