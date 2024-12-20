import axios from 'axios';

const API_BASE_URL = '/api/reminders';

export const createReminder = (data) => axios.post(`${API_BASE_URL}/create`, data);

export const getReminders = () => axios.get(API_BASE_URL);
