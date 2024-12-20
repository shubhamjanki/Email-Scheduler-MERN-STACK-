const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // HTML Email Template
  const htmlTemplate = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title> <!-- Title is dynamically set here -->
    <style>
        /* Styles here */
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header Section -->
        <div class="email-header">
            <h1>${subject}</h1> <!-- This will be just the subject without any prefix -->
            <p>Wishing you joy, peace, and love this festive season!</p>
        </div>
        
        <!-- Content Section -->
        <div class="email-content">
            <p>Dear recipient,</p>
            <p>${text}</p>
        </div>
    </div>
</body>
</html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,  // Ensure this is the exact subject you're passing
    text,  // Plain text content for email clients that don't render HTML
    html: htmlTemplate,  // HTML content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
