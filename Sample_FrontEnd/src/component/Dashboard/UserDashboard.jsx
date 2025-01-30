import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const userStats = [
    { title: 'Parking Status', status: 'Allocated', details: 'Slot A-123' },
    { title: 'Workspace Status', status: 'Assigned', details: 'WS-456' },
    { title: 'Upcoming Bookings', count: 2 },
    { title: 'Pending Requests', count: 1 }
  ];

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="user-dashboard-main">
        <motion.div 
          className="user-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="user-welcome">
            <h1>Welcome, {user?.username}!</h1>
            <p>Employee Dashboard</p>
          </div>
          <motion.button
            className="logout-button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </motion.div>

        <div className="user-stats-grid">
          {userStats.map((stat, index) => (
            <motion.div
              key={index}
              className="user-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3>{stat.title}</h3>
              {stat.status && (
                <div className="status-badge">
                  {stat.status}
                </div>
              )}
              {stat.count !== undefined && (
                <div className="stat-count">
                  {stat.count}
                </div>
              )}
              {stat.details && (
                <div className="stat-details">
                  {stat.details}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="quick-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Parking
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Workspace
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Venue
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Feedback
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard; 