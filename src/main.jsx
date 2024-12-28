
import { createRoot } from 'react-dom/client'
import Web3Provider from './context/Web3Provider'; 
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(

    <Web3Provider>

    <BrowserRouter>

      <App />
      
  </BrowserRouter>

    </Web3Provider>

)
