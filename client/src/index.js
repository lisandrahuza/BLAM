import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

const root = document.getElementById('root')
const element = ReactDom.createRoot(root)
element.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>)
