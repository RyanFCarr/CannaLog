import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PlantDetail from './components/Plants/PlantDetail'
import PlantList from './components/Plants/PlantList'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/plants" element={<PlantList />} />
        <Route path="/plant" element={<PlantDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
