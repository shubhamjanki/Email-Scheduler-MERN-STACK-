import React, { useEffect, useState } from 'react';
import { getReminders } from '../services/api';
import Countdown from './Countdown'; // Import the Countdown component

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReminders = async () => {
    try {
      const response = await getReminders();
      setReminders(response.data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      setError('Failed to load reminders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  if (loading) {
    return <p>Loading reminders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Reminders</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder._id}>
            <strong>{reminder.title}</strong> - {reminder.dateTime}
            <p>{reminder.description}</p>
            <small>Email: {reminder.email}</small>
            {/* Render Countdown component for each reminder */}
            <Countdown targetTime={new Date(reminder.dateTime)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;
