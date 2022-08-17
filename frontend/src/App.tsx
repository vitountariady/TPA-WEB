import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/loginPage'
import RegisterPage from './Pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
    </Routes>
  )
}

export default App
