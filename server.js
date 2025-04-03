const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Хранилище эвентов и пользователей (в реальном проекте используйте базу данных)
let events = []
let users = []

app.get('/events', (req, res, next) => {
  try {
    res.json(events)
  } catch (err) {
    next(err)
  }
})

app.post('/events', (req, res, next) => {
  try {
    const newEvent = req.body
    newEvent.id = Date.now() // генерируем уникальный id
    events.push(newEvent)
    res.status(201).json({ message: 'Event created successfully', event: newEvent })
  } catch (err) {
    next(err)
  }
})

app.post('/register', (req, res, next) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const newUser = { id: Date.now(), username, email, password }
    users.push(newUser)
    res.status(201).json({ message: 'Registration successful', user: newUser })
  } catch (err) {
    next(err)
  }
})

app.post('/login', (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing credentials' })
    }
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      res.json({ message: 'Login successful', user })
    } else {
      res.status(400).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    next(err)
  }
})

// Middleware для глобальной обработки ошибок
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal Server Error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
