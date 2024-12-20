const express = require('express');
const Reminder = require('../models/Reminder');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { email, title, description, dateTime } = req.body;

  try {
    const reminder = new Reminder({ email, title, description, dateTime });
    await reminder.save();
    res.status(201).json({ message: 'Reminder created successfully', reminder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reminder' });
  }
});

router.get('/', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
});

module.exports = router;
