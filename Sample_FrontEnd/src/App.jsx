// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


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
