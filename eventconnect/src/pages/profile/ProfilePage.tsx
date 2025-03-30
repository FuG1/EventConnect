import React, { useState, useEffect } from 'react'
import "./ProfilePage.scss"

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('https://via.placeholder.com/100')

  useEffect(() => {
    const storedUser = { username: 'Имя пользователя', email: 'user@example.com', avatar: 'https://via.placeholder.com/100' }
    setUsername(storedUser.username)
    setEmail(storedUser.email)
    setAvatar(storedUser.avatar)
  }, [])

  const handleSave = () => {
    console.log("Сохранение данных:", { username, email })
    alert('Данные сохранены!')
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={avatar} alt="avatar" className="profile-avatar" />
        <div className="profile-field">
          <label>Имя:</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button onClick={handleSave} className="profile-save-button">Сохранить изменения</button>
      </div>
    </div>
  )
}

export default ProfilePage
