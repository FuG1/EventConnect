import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./home.scss"

interface Event {
    id: number;
    image: string;
    title: string;
    date: string;
    instructions: string;
}

const HomePage: React.FC = () => {
  // Состояние для событий, полученных из БД
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // Эмуляция получения данных. Замените на реальный вызов API.
    const fetchedEvents: Event[] = [
      {
        id: 1,
        image: 'https://via.placeholder.com/300',
        title: 'Событие 1',
        date: '2023-11-10',
        instructions: 'Регистрация через сайт'
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/300',
        title: 'Событие 2',
        date: '2023-12-05',
        instructions: 'Запишитесь по ссылке'
      }
    ]
    setEvents(fetchedEvents)
  }, [])

  return (
    <div className="home-page">
      <div className='countant'>
        <section className="home-hero">
          <h1 className="home-title">Добро пожаловать в EventConnect</h1>
          <p className="home-description">
            Это проект, в котором можно будет размещать свои эвенты и записываться на них.
            С помощью нашего сайта любой сможет узнавать о интересных событиях и открывать что-то новое.
          </p>
        </section>
        <section className="home-features">
          <div className="home-feature">
            <h2>Расписание эвентов</h2>
            <p>Узнавайте о предстоящих мероприятиях в вашем регионе.</p>
          </div>
          <div className="home-feature">
            <h2>Публикация событий</h2>
            <p>Размещайте свои эвенты легко и быстро.</p>
          </div>
          <div className="home-feature">
            <h2>Личный кабинет</h2>
            <p>Следите за своими записями и получайте уведомления.</p>
          </div>
        </section>
        <section className="event-list">
          <h2 className="event-list-title">Актуальные события</h2>
          <div className="events">
            {events.map(event => (
              <Link key={event.id} to={`/event/${event.id}`} style={{ textDecoration: 'none' }}>
                <div className="event-card">
                  <img src={event.image} alt={event.title} className="event-image" />
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-date">Дата: {event.date}</p>
                  <p className="event-instructions">{event.instructions}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
