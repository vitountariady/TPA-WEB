import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider, { UserAuth } from '../contexts/authContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
)
