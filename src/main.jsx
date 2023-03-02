import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import './index.css'
import App from './App'
const queryClint = new QueryClient()
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClint}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
