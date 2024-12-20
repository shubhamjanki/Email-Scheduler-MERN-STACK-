const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const reminderRoutes = require('./routes/reminderRoutes');
const scheduleReminders = require('./scheduler');
const axios = require('axios'); // Add axios for Gemini API calls

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database
connectDB();

// Routes
app.use('/api/reminders', reminderRoutes);

// Start Scheduler
scheduleReminders();

// Gemini API Integration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = process.env.GEMINI_API_KEY;

// Endpoint to generate a professional greeting
app.post('/api/generate-greeting', async (req, res) => {
  const { context } = req.body; // Get the context input from frontend

  if (!context) {
    return res.status(400).json({ error: 'Context is required to generate a greeting.' });
  }

  try {
    // Send a request to the Gemini API
    const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, {
      contents: [{ parts: [{ text: `Generate a professional greeting for: ${context}` }] }]
    });

    // Check if response data is valid
    if (!response.data.candidates || response.data.candidates.length === 0) {
      throw new Error('No candidates returned from Gemini API');
    }

    // Extract the generated greeting from the response
    const greetingMessage = response.data.candidates[0].content.parts[0].text;

    // Send the greeting back to the client
    res.json({ greeting: greetingMessage });
  } catch (error) {
    console.error('Error calling Gemini API for greeting:', error.message || error);
    res.status(500).json({ error: 'Failed to generate greeting message. Please try again.' });
  }
});

// Chatbot API Integration
app.post('/api/chatbot', async (req, res) => {
  const { userInput } = req.body; // Get the user input from frontend

  if (!userInput) {
    return res.status(400).json({ error: 'User input is required to generate a response.' });
  }

  try {
    // Send a request to the Gemini API for chatbot
    const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, {
      contents: [{ parts: [{ text: `Respond to the following query: ${userInput}` }] }]
    });

    // Check if response data is valid
    if (!response.data.candidates || response.data.candidates.length === 0) {
      throw new Error('No candidates returned from Gemini API');
    }

    // Extract the generated chatbot response from the API
    const chatbotMessage = response.data.candidates[0].content.parts[0].text;

    // Send the chatbot response back to the client
    res.json({ response: chatbotMessage });
  } catch (error) {
    console.error('Error calling Gemini API for chatbot:', error.message || error);
    res.status(500).json({ error: 'Failed to generate chatbot response. Please try again.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
