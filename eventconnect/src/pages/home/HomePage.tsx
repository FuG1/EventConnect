import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./home.scss"

interface Event {
    id: number;
    image: string;
    title: string;
    date: string;
    instructions: string;
    description?: string;
    adult?: boolean
}

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAdult, setFilterAdult] = useState(false)

  useEffect(() => {
    const staticEvents: Event[] = [

    ]
    const userEvents: Event[] = JSON.parse(localStorage.getItem('userEvents') || '[]')
    setEvents([...staticEvents, ...userEvents])
  }, [])

  // Фильтрация эвентов по строке поиска и флагу "только для взрослых"
  const filteredEvents = events.filter(ev => 
    ev.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterAdult ? ev.adult === true : true)
  )

  return (
    <div className="home-page">
      <div className='countant'>
        <section className="home-hero">
          <h1 className="home-title">Добро пожаловать в EventConnect</h1>
          <p className="home-description">
            Это проект, где можно просматривать эвенты, создавать свои и применять фильтры для быстрого поиска.
          </p>
          <div className="event-filters">
            <input 
              type="text" 
              placeholder="Поиск по названию эвента" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label>
              <input 
                type="checkbox" 
                checked={filterAdult}
                onChange={(e) => setFilterAdult(e.target.checked)}
              />
              Показать только эвенты 18+
            </label>
          </div>
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
            {filteredEvents.map(event => (
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
