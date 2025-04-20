const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEmail = async ( subject, text,to = process.env.EMAIL_TO) => {
  try {
    await transporter.sendMail({
      from: `"Garbage Detection" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};