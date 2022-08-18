import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/loginPage'
import RegisterPage from './Pages/RegisterPage'
import Homepage from './Pages/Homepage'
import ProfilePage from './Pages/ProfilePage'
import AuthContextProvider from '../contexts/authContext'
import ProtectedRoute from '../contexts/middleware'

const Protected = () =>{
  return(
    <ProtectedRoute>
      <Outlet></Outlet>
    </ProtectedRoute>
  )
}

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route element={<Protected/>}>
          <Route path="/home" element={<Homepage></Homepage>}></Route>
          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App
