const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, required: true },
});

module.exports = mongoose.model('Reminder', reminderSchema);
