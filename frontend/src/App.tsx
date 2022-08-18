import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/loginPage'
import RegisterPage from './Pages/RegisterPage'
import Homepage from './Pages/Homepage'
import ProfilePage from './Pages/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/home" element={<Homepage></Homepage>}></Route>
      <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
    </Routes>
  )
}

export default App
