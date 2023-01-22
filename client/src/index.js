import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext'
import { WatchListContextProvider } from './Context/watchlistContext'
import ScrollToTop from './utils/ScrollToTop'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WatchListContextProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path='*' element={<App />} />
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </WatchListContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

reportWebVitals()
