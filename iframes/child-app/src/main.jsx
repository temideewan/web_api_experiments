import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// eslint-disable-next-line no-unused-vars
import MyWidget from './widget.js';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App {...window.xprops}/>
  </StrictMode>,
)
