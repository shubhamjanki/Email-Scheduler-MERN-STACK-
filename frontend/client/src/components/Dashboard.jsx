import React from 'react';

const templates = [
  { name: 'Birthday', icon: '🎂' },
  { name: 'Anniversary', icon: '💍' },
  { name: 'Official Greetings', icon: '🏢' },
  { name: 'Custom Template', icon: '📝' },
];

const Dashboard = ({ onSelectTemplate }) => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {templates.map((template) => (
        <div
          key={template.name}
          onClick={() => onSelectTemplate(template.name)} // Pass selected template to App
          className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-center p-6 rounded-lg shadow-md transition duration-300"
        >
          <div className="text-4xl mb-2">{template.icon}</div>
          <h3 className="text-lg font-semibold">{template.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
