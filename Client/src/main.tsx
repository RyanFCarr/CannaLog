import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PlantList from './components/Plants/PlantList'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="plants/*" element={<PlantList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
