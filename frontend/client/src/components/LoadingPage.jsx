// src/LoadingPage.js
import React from 'react';
import './LoadingPage.css';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <div className="loading-text">Loading, please wait...</div>
    </div>
  );
};

export default LoadingPage;
