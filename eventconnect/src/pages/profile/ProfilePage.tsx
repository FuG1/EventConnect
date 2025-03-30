import React, { useState, useEffect } from 'react'
import "./ProfilePage.scss"

const ProfilePage: React.FC = () => {
  // Профиль пользователя
  const [username, setUsername] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [about, setAbout] = useState('')
  const [avatar, setAvatar] = useState('https://via.placeholder.com/100')

  // Состояния для создания эвента
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventInstructions, setEventInstructions] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventImage, setEventImage] = useState('https://via.placeholder.com/300')
  const [eventAdult, setEventAdult] = useState(false)  // новое поле

  // Управление отображением форм
  const [editingProfile, setEditingProfile] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)

  useEffect(() => {
    const storedUser = { username: 'Имя', surname: 'Фамилия', email: 'user@example.com', avatar: 'https://via.placeholder.com/100' }
    setUsername(storedUser.username)
    setSurname(storedUser.surname)
    setEmail(storedUser.email)
    setAvatar(storedUser.avatar)
  }, [])

  const handleSave = () => {
    console.log("Сохранение данных:", { username, surname, email, age, about })
    alert('Данные профиля сохранены!')
    setEditingProfile(false)
    // Сохраняем возраст для дальнейшей проверки регистрации на эвенты 18+
    localStorage.setItem('userAge', age)
  }

  const handleEventCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const newEvent = {
      id: Date.now(),
      image: eventImage,
      title: eventTitle,
      date: eventDate,
      instructions: eventInstructions,
      description: eventDescription,
      adult: eventAdult  // добавляем отметку "для взрослых"
    }
    const existingEvents = JSON.parse(localStorage.getItem('userEvents') || '[]')
    existingEvents.push(newEvent)
    localStorage.setItem('userEvents', JSON.stringify(existingEvents))
    alert('Новый эвент создан и опубликован!')
    setShowEventForm(false)
    setEventTitle('')
    setEventDate('')
    setEventInstructions('')
    setEventDescription('')
    setEventImage('https://via.placeholder.com/300')
    setEventAdult(false)
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={avatar} alt="avatar" className="profile-avatar" />
        <h2>{username} {surname}</h2>
        {!editingProfile && (
          <button onClick={() => setEditingProfile(true)} className="profile-save-button">
            Изменить данные
          </button>
        )}
        {editingProfile && (
          <>
            <div className="profile-field">
              <label>Имя:</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="profile-field">
              <label>Фамилия:</label>
              <input value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
            <div className="profile-field">
              <label>Email:</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="profile-field">
              <label>Возраст:</label>
              <input value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="profile-field">
              <label>О себе:</label>
              <textarea value={about} onChange={(e) => setAbout(e.target.value)} />
            </div>
            <button onClick={handleSave} className="profile-save-button">Сохранить изменения</button>
          </>
        )}
        {!showEventForm && (
          <button onClick={() => setShowEventForm(true)} className="profile-save-button">
            Создать новый эвент
          </button>
        )}
        {showEventForm && (
          <form onSubmit={handleEventCreate} className="event-creation-form">
            <div className="profile-field">
              <label>Название эвента:</label>
              <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
            </div>
            <div className="profile-field">
              <label>Дата эвента:</label>
              <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
            </div>
            <div className="profile-field">
              <label>Инструкция:</label>
              <input type="text" value={eventInstructions} onChange={(e) => setEventInstructions(e.target.value)} required />
            </div>
            <div className="profile-field">
              <label>Описание:</label>
              <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} required />
            </div>
            <div className="profile-field">
              <label>URL изображения:</label>
              <input type="text" value={eventImage} onChange={(e) => setEventImage(e.target.value)} required />
            </div>
            <div className="profile-field">
              <label>
                <input type="checkbox" checked={eventAdult} onChange={(e) => setEventAdult(e.target.checked)} />
                Только для взрослых (18+)
              </label>
            </div>
            <button type="submit" className="profile-save-button">Опубликовать эвент</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
