import React, { useState, useEffect } from 'react';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

const App = () => {
  const [reminders, setReminders] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState('Custom'); // Set initial template to 'Custom'

  // Load reminders from Local Storage when the app loads
  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders'));
    if (savedReminders) setReminders(savedReminders);
  }, []);

  // Save reminders to Local Storage when they change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Function to add a new reminder
  const addReminder = (newReminder) => {
    setReminders([...reminders, newReminder]);
    setCurrentView('list'); // Navigate to list after adding
  };

  // Handle tile click to select email type
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template); // Automatically set the selected template
    setCurrentView('form'); // Navigate to the form view after template selection
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content */}
      <div className="p-6">
        {/* Dashboard View - Template Selection */}
        {currentView === 'dashboard' && (
          <div className="bg-white shadow-lg p-16 rounded-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center text-black">Select Email Type</h2>
            <Dashboard onSelectTemplate={handleTemplateSelect} />
          </div>
        )}

        {/* Form View - Reminder Creation with Selected Template */}
        {currentView === 'form' && (
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Create {selectedTemplate} Email
            </h2>
            <ReminderForm
              onAddReminder={addReminder}
              templateType={selectedTemplate} // Pass selected template to the form
            />
          </div>
        )}

        {/* List View - View All Scheduled Emails */}
        {currentView === 'list' && (
          <div className="bg-white shadow-lg p-16 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-black">Your Scheduled Emails</h2>
            <ReminderList reminders={reminders} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

