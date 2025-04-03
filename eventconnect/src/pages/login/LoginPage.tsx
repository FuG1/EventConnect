import React, { useState } from "react";
import "./login.scss";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setError("");
      } else {
        const errData = await res.json();
        setError(errData.message);
      }
    } catch (err) {
      setError("Ошибка подключения");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {!user ? (
          <>
            <h2 className="login-title">Добро пожаловать!</h2>
            <p className="login-subtitle">Введите свои учетные данные</p>
            <form className="login-form" onSubmit={handleLogin}>
              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Пароль"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit" className="login-button">
                Войти
              </button>
            </form>
          </>
        ) : (
          <div>
            <h2>Добро пожаловать, {user.username}!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
