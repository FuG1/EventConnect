import React from "react";
import "./login.scss";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Добро пожаловать!</h2>
        <p className="login-subtitle">Введите свои учетные данные</p>

        <form className="login-form">
          <div>
            <input
              type="email"
              placeholder="E-mail"
              className="login-input"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              className="login-input"
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Войти
          </button>
        </form>

        <p className="login-footer">
          Нет аккаунта?{' '}
          <a href="#" className="login-link">
            Зарегистрируйтесь
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
