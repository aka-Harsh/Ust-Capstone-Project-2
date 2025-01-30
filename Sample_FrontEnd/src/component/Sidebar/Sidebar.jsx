import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaTachometerAlt, 
  FaUsers, 
  FaCar, 
  FaBuilding, 
  FaCalendarAlt, 
  FaMoon, 
  FaSun, 
  FaUserCircle 
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const menuItems = [
    { path: '/admin-dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/admin/employees', icon: <FaUsers />, label: 'Employees' },
    { path: '/admin/parking', icon: <FaCar />, label: 'Parking' },
    { path: '/admin/workspace', icon: <FaBuilding />, label: 'Workspace' },
    { path: '/admin/venue', icon: <FaCalendarAlt />, label: 'Venue' }
  ];

  return (
    <>
      <motion.div 
        className={`sidebar ${isDarkMode ? 'dark' : ''} ${isOpen ? 'open' : 'closed'}`}
        animate={{ width: isOpen ? '250px' : '80px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.div 
          className="sidebar-toggle"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </motion.div>

        <div className="profile-section" onClick={toggleProfile}>
          <motion.div 
            className="profile-image"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaUserCircle />
          </motion.div>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                className="profile-name"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {user?.username}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <motion.div 
                className="nav-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.icon}
              </motion.div>
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        <motion.div 
          className="theme-toggle"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showProfile && (
          <motion.div 
            className="profile-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleProfile}
          >
            <motion.div 
              className="profile-modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h2>Profile Details</h2>
              <div className="modal-profile-image">
                <FaUserCircle />
              </div>
              <div className="profile-details">
                <div className="detail-item">
                  <label>Username</label>
                  <span>{user?.username}</span>
                </div>
                <div className="detail-item">
                  <label>Role</label>
                  <span>{user?.role}</span>
                </div>
              </div>
              <motion.button 
                className="close-modal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleProfile}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;