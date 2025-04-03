import React, { useState } from "react"
import "./registration.scss"

const RegistrationPage: React.FC = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      })
      if (res.ok) {
        const data = await res.json()
        setMessage(data.message)
      } else {
        const errData = await res.json()
        setMessage(errData.message)
      }
    } catch (err) {
      setMessage("Ошибка подключения")
    }
  }

  return (
    <div className="registration-page">
      <div className="registration-card">
        <h2 className="registration-title">Зарегистрируйтесь</h2>
        <p className="registration-subtitle">Создайте новый аккаунт</p>
        <form className="registration-form" onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              placeholder="Имя"
              className="registration-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="E-mail"
              className="registration-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              className="registration-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <p className="message">{message}</p>}
          <button type="submit" className="registration-button">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegistrationPage
