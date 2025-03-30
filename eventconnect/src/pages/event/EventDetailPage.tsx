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
}

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null)

  useEffect(() => {
    // Эмуляция получения данных для эвента по id. Замените на вызов API.
    const fetchedEvent: EventDetail = {
      id: Number(id),
      image: 'https://via.placeholder.com/600',
      title: `Событие ${id}`,
      date: '2023-11-10',
      instructions: 'Регистрация через сайт',
      description: 'Подробное описание события. Здесь можно указать все детали мероприятия, программу, участников и т.д.'
    }
    setEventDetail(fetchedEvent)
  }, [id])

  if (!eventDetail) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="event-detail-page">
      <div className="event-detail-card">
        <img src={eventDetail.image} alt={eventDetail.title} className="detail-image"/>
        <h1 className="detail-title">{eventDetail.title}</h1>
        <p className="detail-date">Дата: {eventDetail.date}</p>
        <p className="detail-description">{eventDetail.description}</p>
        <p className="detail-instructions">Как записаться: {eventDetail.instructions}</p>
        <button className="detail-register-button">Записаться на мероприятие</button>
      </div>
    </div>
  )
}

export default EventDetailPage
