import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/header/Header.tsx'
import LoginPage from './pages/login/LoginPage.tsx'
import RegistrationPage from './pages/registration/RegistrationPage.tsx'
import HomePage from './pages/home/HomePage'
import EventDetailPage from './pages/event/EventDetailPage'
import ProfilePage from './pages/profile/ProfilePage'
import './App.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
