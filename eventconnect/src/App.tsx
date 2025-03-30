import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/header/Header.tsx'
import LoginPage from './pages/login/LoginPage.tsx'
import RegistrationPage from './pages/registration/RegistrationPage.tsx'
import './App.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
