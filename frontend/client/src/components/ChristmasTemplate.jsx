import React from 'react';

const ChristmasTemplate = ({ title, description, dateTime }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{
          backgroundColor: '#c0392b',
          color: '#fff',
          textAlign: 'center',
          padding: '20px',
        }}>
          <h1 style={{ margin: 0 }}>🎄 Merry Christmas! 🎄</h1>
          <p>Season's Greetings and Warm Wishes!</p>
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#c0392b' }}>{title || 'Your Reminder'}</h2>
          <p>{description || 'Don’t forget your upcoming task!'}</p>
          <p style={{ fontWeight: 'bold' }}>⏰ {dateTime || 'No date specified'}</p>
        </div>
        <div style={{
          backgroundColor: '#2c3e50',
          color: '#ecf0f1',
          textAlign: 'center',
          padding: '10px',
        }}>
          <p style={{ margin: 0 }}>Wishing you a wonderful holiday season!</p>
          <small>&copy; 2024 Your Company. All Rights Reserved.</small>
        </div>
      </div>
    </div>
  );
};

export default ChristmasTemplate;
