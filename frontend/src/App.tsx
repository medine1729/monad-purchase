import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <nav>
          <Link to="/">Product</Link> | <Link to="/admin">Admin</Link>
        </nav>
      </header>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  )
}