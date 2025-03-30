import React from "react"
import "./registration.scss"

const RegistrationPage: React.FC = () => {
  return (
    <div className="registration-page">
      <div className="registration-card">
        <h2 className="registration-title">Зарегистрируйтесь</h2>
        <p className="registration-subtitle">Создайте новый аккаунт</p>

        <form className="registration-form">
          <div>
            <input
              type="text"
              placeholder="Имя"
              className="registration-input"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="E-mail"
              className="registration-input"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              className="registration-input"
            />
          </div>

          <button
            type="submit"
            className="registration-button"
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="registration-footer">
          Уже есть аккаунт?{' '}
          <a href="/login" className="registration-link">
            Войти
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegistrationPage
