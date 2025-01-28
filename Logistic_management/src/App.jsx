import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './component/Login/login'
import AdminDashboard from './component/Dashboard/AdminDashboard'
import UserDashboard from './component/Dashboard/UserDashboard'
import Employees from './component/Admin/Employees'
import Parking from './component/Admin/Parking'
import Workspace from './component/Admin/Workspace'
import Venue from './component/Admin/Venue'
import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  
  if (!user) {
    return <Navigate to="/" replace />
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    setIsAuthenticated(!!user)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRole="admin">
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/parking"
          element={
            <ProtectedRoute allowedRole="admin">
              <Parking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/workspace"
          element={
            <ProtectedRoute allowedRole="admin">
              <Workspace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/venue"
          element={
            <ProtectedRoute allowedRole="admin">
              <Venue />
            </ProtectedRoute>
          }
        />

        {/* Protected Employee Route */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRole="employee">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all route - redirects to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
