/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
)
