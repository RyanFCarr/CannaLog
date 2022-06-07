import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditPlant from './components/Plants/EditPlant'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditPlant />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
