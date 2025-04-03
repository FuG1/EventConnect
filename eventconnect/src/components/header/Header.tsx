import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./header.scss"

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<{ username: string } | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (
        <div className='Header'>
            <header className='Header__container'>
                <div className='Header__logo'>
                    <h1><Link to="/">EventConnect</Link></h1>
                </div>
                <div className='Header__buttons'>
                    { user ? (
                        <button className='Header__button__profile' onClick={() => navigate("/profile")}>
                            Профиль
                        </button>
                    ) : (
                        <>
                        <button className='Header__button__login' onClick={() => navigate("/login")}>Login</button>
                        <button className='Header__button__signup' onClick={() => navigate("/registration")}>Sign Up</button>
                        </>
                    )}
                </div>
            </header>
        </div>
    )
}
