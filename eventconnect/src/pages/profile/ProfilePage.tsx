import React, { useState, useEffect } from 'react'
import "./ProfilePage.scss"

const ProfilePage: React.FC = () => {
  // Состояние профиля
  const [profile, setProfile] = useState({
    username: '',
    surname: '',
    email: '',
    age: '',
    about: '',
    avatar: 'https://via.placeholder.com/100'
  })
  const [editingProfile, setEditingProfile] = useState(false)

  // Состояния формы создания эвента
  const [eventForm, setEventForm] = useState({
    eventTitle: '',
    eventDate: '',
    eventInstructions: '',
    eventDescription: '',
    eventImage: 'https://via.placeholder.com/300',
    eventAdult: false
  })
  const [showEventForm, setShowEventForm] = useState(false)

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile')
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    } else {
      setProfile({
        username: 'Имя',
        surname: 'Фамилия',
        email: 'user@example.com',
        age: '',
        about: '',
        avatar: 'https://via.placeholder.com/100'
      })
    }
  }, [])

  const handleProfileSave = () => {
    localStorage.setItem('profile', JSON.stringify(profile))
    alert('Данные профиля сохранены!')
    setEditingProfile(false)
    // Сохраняем возраст для проверки эвентов для взрослых
    localStorage.setItem('userAge', profile.age)
  }

  const handleEventCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const newEvent = {
      id: Date.now(),
      image: eventForm.eventImage,
      title: eventForm.eventTitle,
      date: eventForm.eventDate,
      instructions: eventForm.eventInstructions,
      description: eventForm.eventDescription,
      adult: eventForm.eventAdult
    }
    const existingEvents = JSON.parse(localStorage.getItem('userEvents') || '[]')
    existingEvents.push(newEvent)
    localStorage.setItem('userEvents', JSON.stringify(existingEvents))
    alert('Новый эвент создан и опубликован!')
    setShowEventForm(false)
    setEventForm({
      eventTitle: '',
      eventDate: '',
      eventInstructions: '',
      eventDescription: '',
      eventImage: 'https://via.placeholder.com/300',
      eventAdult: false
    })
  }

  // Новая функция для загрузки аватарки
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={profile.avatar} alt="avatar" className="profile-avatar" />
        {!editingProfile ? (
          <>
            <div className="profile-info">
              <p><strong>Имя:</strong> {profile.username}</p>
              <p><strong>Фамилия:</strong> {profile.surname}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Возраст:</strong> {profile.age}</p>
              <p><strong>О себе:</strong> {profile.about}</p>
            </div>
            <button onClick={() => setEditingProfile(true)} className="profile-save-button">
              Изменить данные
            </button>
          </>
        ) : (
          <>
            <div className="profile-field">
              <label>Имя:</label>
              <input
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              />
            </div>
            <div className="profile-field">
              <label>Фамилия:</label>
              <input
                value={profile.surname}
                onChange={(e) => setProfile({ ...profile, surname: e.target.value })}
              />
            </div>
            <div className="profile-field">
              <label>Email:</label>
              <input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className="profile-field">
              <label>Возраст:</label>
              <input
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              />
            </div>
            <div className="profile-field">
              <label>О себе:</label>
              <textarea
                value={profile.about}
                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
              />
            </div>
            {/* Новое поле для загрузки аватарки */}
            <div className="profile-field">
              <label>Аватар:</label>
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>
            <button onClick={handleProfileSave} className="profile-save-button">
              Сохранить изменения
            </button>
          </>
        )}
        {/* Кнопка создания эвента остается */}
        {!showEventForm && (
          <button onClick={() => setShowEventForm(true)} className="profile-save-button">
            Создать новый эвент
          </button>
        )}
        {showEventForm && (
          <form onSubmit={handleEventCreate} className="event-creation-form">
            <div className="profile-field">
              <label>Название эвента:</label>
              <input
                type="text"
                value={eventForm.eventTitle}
                onChange={(e) => setEventForm({ ...eventForm, eventTitle: e.target.value })}
                required
              />
            </div>
            <div className="profile-field">
              <label>Дата эвента:</label>
              <input
                type="date"
                value={eventForm.eventDate}
                onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
                required
              />
            </div>
            <div className="profile-field">
              <label>Инструкция:</label>
              <input
                type="text"
                value={eventForm.eventInstructions}
                onChange={(e) => setEventForm({ ...eventForm, eventInstructions: e.target.value })}
                required
              />
            </div>
            <div className="profile-field">
              <label>Описание:</label>
              <textarea
                value={eventForm.eventDescription}
                onChange={(e) => setEventForm({ ...eventForm, eventDescription: e.target.value })}
                required
              />
            </div>
            <div className="profile-field">
              <label>URL изображения:</label>
              <input
                type="text"
                value={eventForm.eventImage}
                onChange={(e) => setEventForm({ ...eventForm, eventImage: e.target.value })}
                required
              />
            </div>
            <div className="profile-field">
              <label>
                <input
                  type="checkbox"
                  checked={eventForm.eventAdult}
                  onChange={(e) => setEventForm({ ...eventForm, eventAdult: e.target.checked })}
                />
                Только для взрослых (18+)
              </label>
            </div>
            <button type="submit" className="profile-save-button">
              Опубликовать эвент
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
