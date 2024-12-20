import React from 'react';

const Navbar = ({ currentView, setCurrentView }) => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Reminder App</h1>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-lg text-lg ${
                currentView === 'dashboard'
                  ? 'bg-white text-blue-500 shadow-lg'
                  : 'hover:bg-white hover:text-blue-500'
              } transition-all duration-300`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView('form')}
              className={`px-4 py-2 rounded-lg text-lg ${
                currentView === 'form'
                  ? 'bg-white text-blue-500 shadow-lg'
                  : 'hover:bg-white hover:text-blue-500'
              } transition-all duration-300`}
            >
              Add Reminder
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView('list')}
              className={`px-4 py-2 rounded-lg text-lg ${
                currentView === 'list'
                  ? 'bg-white text-blue-500 shadow-lg'
                  : 'hover:bg-white hover:text-blue-500'
              } transition-all duration-300`}
            >
              View Reminders
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
