import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./EventDetailPage.scss"

interface EventDetail {
  id: number;
  image: string;
  title: string;
  date: string;
  instructions: string;
  description: string;
  adult?: boolean
}

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null)

  useEffect(() => {
    // Эмуляция получения данных эвента по id.
    const fetchedEvent: EventDetail = {
      id: Number(id),
      image: 'https://via.placeholder.com/600',
      title: `Событие ${id}`,
      date: '2023-11-10',
      instructions: 'Регистрация через сайт',
      description: 'Подробное описание события. Здесь можно указать все детали мероприятия.',
      // Для демонстрации: эвент с id 3 (и, возможно, созданные пользователем) помечается как для взрослых
      adult: Number(id) === 3  
    }
    setEventDetail(fetchedEvent)
  }, [id])

  if (!eventDetail) {
    return <div>Загрузка...</div>
  }

  // Получаем возраст пользователя из localStorage
  const userAge = Number(localStorage.getItem('userAge') || 0)
  const isUnderage = eventDetail.adult && userAge < 18

  return (
    <div className="event-detail-page">
      <div className="event-detail-card">
        <img src={eventDetail.image} alt={eventDetail.title} className="detail-image"/>
        <h1 className="detail-title">{eventDetail.title}</h1>
        <p className="detail-date">Дата: {eventDetail.date}</p>
        <p className="detail-description">{eventDetail.description}</p>
        <p className="detail-instructions">Как записаться: {eventDetail.instructions}</p>
        <button 
          className="detail-register-button"
          disabled={isUnderage}
        >
          {isUnderage ? 'Доступно только для 18+' : 'Записаться на мероприятие'}
        </button>
      </div>
    </div>
  )
}

export default EventDetailPage
