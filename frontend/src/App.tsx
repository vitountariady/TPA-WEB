import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/loginPage'
import RegisterPage from './Pages/RegisterPage'
import Homepage from './Pages/Homepage'
import ProfilePage from './Pages/ProfilePage'
import { UserAuth } from '../contexts/authContext'
import RefetchContextProvider from '../contexts/refetcher'
import {ProtectedRoute, UnprotectedRoute} from '../contexts/middleware'
import { Activate } from '../queries/queries'
import ActivationPage from './Pages/ActivationPage'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import ResetPasswordPage from './Pages/ResetPassword'
import Error404Page from './Pages/Error404Page'
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { FaYoutubeSquare } from 'react-icons/fa'
import MyNetworkPage from './Pages/MyNetworkPage'
import MyNetwork from './Pages/MyNetworkPage'

const Protected = () =>{
  return(
    <ProtectedRoute>
      <Outlet></Outlet>
    </ProtectedRoute>
  )
}

const Unprotected = () =>{
  return(
    <UnprotectedRoute>
      <Outlet></Outlet>
    </UnprotectedRoute>
  )
}


function App() {
  const main_url = "http://localhost:8080";
  const url = main_url + "/query";
  const userContext = UserAuth();
  const authLink = new ApolloLink((operation:any, forward:any)=>{
    if(userContext.user && userContext.token!==undefined && Object.keys(userContext.token).length!==0){
      operation.setContext({
        headers:{
          Authorization: `Bearer ${userContext.token}`,
        }
      })
    }
    return forward(operation)
  })

  const httplink = createHttpLink({
    uri:url,
  })

  const client = new ApolloClient({
    link:authLink.concat(httplink),
    cache: new InMemoryCache({})
  })


  return (
    <ApolloProvider client={client}>
      <RefetchContextProvider>
        <Routes>
          <Route path="/activate/:id" element={<ActivationPage></ActivationPage>}></Route>
          <Route element={<Unprotected/>}>
            <Route path="/" element={<LoginPage></LoginPage>}></Route>
            <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
            <Route path="/forgotPassword" element={<ForgotPasswordPage></ForgotPasswordPage>}></Route>
            <Route path="/resetPassword/:id" element={<ResetPasswordPage></ResetPasswordPage>}></Route>
          </Route>
          <Route element={<Protected/>}>
            <Route path="/mynetwork" element={<MyNetwork></MyNetwork>}></Route>
            <Route path="/home" element={<Homepage></Homepage>}></Route>
            <Route path="/profile/:id" element={<ProfilePage></ProfilePage>}></Route>
          </Route>
          <Route path="*" element={<Error404Page></Error404Page>}></Route>
        </Routes>
      </RefetchContextProvider>
    </ApolloProvider>
  )
}

export default App
