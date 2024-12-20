const cron = require('node-cron');
const Reminder = require('./models/Reminder');
const sendEmail = require('./emailService');

const scheduleReminders = () => {
  cron.schedule('* * * * *', async () => {  // Runs every minute
    const now = new Date();

    try {
      const reminders = await Reminder.find({ dateTime: { $lte: now } });
      
      reminders.forEach(async (reminder) => {
        const { email, title, description } = reminder;
        await sendEmail(email, `Reminder: ${title}`, description || 'No description provided.');

        // Delete reminder after sending email
        await Reminder.deleteOne({ _id: reminder._id });
      });
    } catch (error) {
      console.error('Error sending reminders:', error);
    }
  });
};

module.exports = scheduleReminders;
