import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Mystore from './store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Mystore}>
      <App />
    </Provider>
  </StrictMode>,
)
