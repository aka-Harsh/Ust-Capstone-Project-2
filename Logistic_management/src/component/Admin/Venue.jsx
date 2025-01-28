import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { motion } from 'framer-motion';
import './Admin.css';

const Venue = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : 'light'}`}>
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <motion.div 
        className="dashboard-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Venue Management</h1>
        <div className="content-area">
          <p>Venue management content will go here</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Venue; 