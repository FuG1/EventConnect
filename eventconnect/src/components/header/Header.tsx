import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./header.scss"

export const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='Header'>
        <header className='Header__container'>
            <div className='Header__logo'>
                <h1><Link to="/">EventConnect</Link></h1>
            </div>
            <div className='Header__buttons'>
                <button className='Header__button__login' onClick={() => navigate("/login")}>Login</button>
                <button className='Header__button__signup' onClick={() => navigate("/registration")}>Sign Up</button>
            </div>
        </header>
    </div>
  )
}
