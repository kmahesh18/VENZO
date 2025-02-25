import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <motion.div 
      className="not-found-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="not-found-content">
        <motion.h1 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Page Not Found
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NotFound; 