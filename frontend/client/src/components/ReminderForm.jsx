import React, { useState, useEffect, useRef } from 'react';
import { createReminder } from '../services/api';
import { FaBirthdayCake, FaHeart, FaBuilding, FaMagic, FaComments, FaTimes } from 'react-icons/fa'; // Import necessary icons
import axios from 'axios';

const templateOptions = {
  Birthday: {
    title: 'Happy Birthday 🎉',
    description: 'Wishing you a wonderful birthday filled with joy and laughter!',
    icon: <FaBirthdayCake className="text-xl text-pink-500" />,
  },
  Anniversary: {
    title: 'Happy Anniversary 💍',
    description: 'Wishing you both a day of love and happiness on your special day!',
    icon: <FaHeart className="text-xl text-red-500" />,
  },
  'Official Greetings': {
    title: 'Greetings from the Team 🏢',
    description: 'Best wishes for your continued success and collaboration.',
    icon: <FaBuilding className="text-xl text-blue-500" />,
  },
  Custom: {
    title: '',
    description: '',
    icon: null,
  },
};

const ReminderForm = ({ templateType, onAddReminder }) => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [showChat, setShowChat] = useState(false); // Chat toggle state
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Welcome! How can I assist you today?' }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (templateType && templateOptions[templateType]) {
      setTitle(templateOptions[templateType].title);
      setDescription(templateOptions[templateType].description);
    }
  }, [templateType]);

  const handleSuggestGreeting = async () => {
    if (!title) {
      alert('Please provide a title or context for the greeting suggestion.');
      return;
    }

    setSuggesting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-greeting', {
        context: title,
      });
      setDescription(response.data.greeting);
    } catch (error) {
      console.error('Error suggesting greeting:', error);
      alert('Failed to fetch greeting suggestions.');
    } finally {
      setSuggesting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await createReminder({ email, title, description, dateTime });
      alert('Reminder created successfully!');
      onAddReminder({ email, title, description, dateTime });
      setEmail('');
      setTitle('');
      setDescription('');
      setDateTime('');
    } catch (error) {
      console.error('Error creating reminder:', error);
      alert('Failed to create reminder.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';

    if (!title) errors.title = 'Title is required';
    if (!dateTime) errors.dateTime = 'Date and time are required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Add user message to chat
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');

      try {
        // Send the user input to the backend to get the chatbot response
        const response = await axios.post('http://localhost:5000/api/chatbot', { userInput: input });
        const botResponse = response.data.response;

        // Add bot response to chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botResponse },
        ]);
      } catch (error) {
        console.error('Error fetching chatbot response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Sorry, I could not get a response at this time.' },
        ]);
      }
    }
  };

  useEffect(() => {
    // Scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">Create Reminder</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-white text-sm">Recipient Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter recipient's email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-white text-sm">Email Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter email title"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-white text-sm">Email Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            rows="3"
            placeholder="Enter email description"
          ></textarea>
        </div>

        {/* Suggest Greeting */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleSuggestGreeting}
            className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            disabled={suggesting}
          >
            <FaMagic className="mr-2" />
            {suggesting ? 'Suggesting...' : 'Suggest Greeting'}
          </button>
        </div>

        {/* Date and Time */}
        <div className="mb-4">
          <label className="block text-white text-sm">Date and Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full border p-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
          />
          {errors.dateTime && <p className="text-red-500 text-xs mt-1">{errors.dateTime}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-lg w-full hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Reminder'}
        </button>
      </form>

      {/* Chat Button */}
      <button
        onClick={() => setShowChat((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        <FaComments className="text-2xl" />
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-16 right-6 w-80 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
          {/* Chat Header */}
          <div className="p-4 bg-blue-600 text-white font-bold rounded-t-lg flex justify-between">
            <span>Chat with Us</span>
            <button onClick={() => setShowChat(false)}>
              <FaTimes className="text-white" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="p-4 flex-grow h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <p
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input and Send */}
          <div className="flex items-center border-t p-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow border p-2 rounded-l-lg focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderForm;
