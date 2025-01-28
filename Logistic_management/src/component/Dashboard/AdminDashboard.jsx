import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaCar, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedStat, setSelectedStat] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const stats = [
    { 
      title: 'Total Employees',
      count: '1500',
      icon: <FaUsers />,
      color: '#4a90e2',
      bgColor: '#e8f1fc',
      details: ['Active: 1200', 'On Leave: 300']
    },
    { 
      title: 'Parking Slots',
      count: '1000',
      icon: <FaCar />,
      color: '#45b7af',
      bgColor: '#e5f5f4',
      details: ['Available: 400', 'Occupied: 600']
    },
    { 
      title: 'Workspaces',
      count: '1000',
      icon: <FaBuilding />,
      color: '#f1556c',
      bgColor: '#fde8eb',
      details: ['Available: 300', 'Occupied: 700']
    },
    { 
      title: 'Venues',
      count: '20',
      icon: <FaCalendarAlt />,
      color: '#f7b84b',
      bgColor: '#fef4e4',
      details: ['Available: 8', 'Booked: 12']
    }
  ];

  const utilization = [
    {
      title: 'Parking Utilization',
      percentage: 50,
      color: '#4a90e2',
      details: ['Occupied: 500', 'Available: 500']
    },
    {
      title: 'Workspace Occupancy',
      percentage: 60,
      color: '#45b7af',
      details: ['In Use: 600', 'Available: 400']
    },
    {
      title: 'Venue Booking Rate',
      percentage: 75,
      color: '#f1556c',
      details: ['Booked: 15', 'Available: 5']
    }
  ];

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <motion.main 
        className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}
        animate={{ 
          marginLeft: isSidebarOpen ? '250px' : '60px',
          width: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 60px)'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>

        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedStat(selectedStat === index ? null : index)}
            >
              <div className="stat-content">
                <motion.div 
                  className="stat-icon"
                  style={{ backgroundColor: stat.bgColor, color: stat.color }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="stat-details">
                  <h3>{stat.title}</h3>
                  <motion.span 
                    className="stat-number"
                    style={{ color: stat.color }}
                  >
                    {stat.count}
                  </motion.span>
                </div>
              </div>
              <AnimatePresence>
                {selectedStat === index && (
                  <motion.div
                    className="stat-expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {stat.details.map((detail, i) => (
                      <motion.div 
                        key={i} 
                        className="detail-item"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {detail}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="utilization-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {utilization.map((item, index) => (
            <motion.div
              key={index}
              className="utilization-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3>{item.title}</h3>
              <div className="circle-progress">
                <motion.svg 
                  viewBox="0 0 36 36"
                  initial={{ rotate: -90 }}
                >
                  <motion.path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <motion.path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: item.percentage / 100 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </motion.svg>
                <motion.div 
                  className="percentage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  style={{ color: item.color }}
                >
                  {item.percentage}%
                </motion.div>
              </div>
              <div className="utilization-details">
                {item.details.map((detail, i) => (
                  <motion.div 
                    key={i} 
                    className="detail-item"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                  >
                    {detail}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
};

export default AdminDashboard;