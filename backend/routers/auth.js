const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const CryptoJS = require('crypto-js');



const validateEmailDomain = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
const JWT_SECRET = 'your_jwt_secret_key';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'deepshikhap9877@gmail.com',
    pass: 'hovn iwsc hjbf iusz',
  },
});

// Function to generate a random password
const generateRandomPassword = (length = 10) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

router.post('/signup', async (req, res) => {
  const { empname, email, empid, phoneNo, jobRole, password } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const existingEmpId = await User.findOne({ empid });
  if (existingEmpId) {
    return res.status(400).json({ error: 'Employee ID already exists' });
  }

  // Validation for empname: only letters allowed

  const empnameRegex = /^[a-zA-Z\s]+$/;
  if (!empname.match(empnameRegex)) {
    return res.status(400).json({ error: 'Name must contain only letters and spaces' });
  }


  // Validation for email domain
  if (!validateEmailDomain(email)) {
    return res.status(400).json({ error: 'Invalid email domain.' });
  }

  // Validation for password
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    empname,
    email,
    empid,
    phoneNo,
    jobRole,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });

    // Send welcome email
    const mailOptions = {
      from: 'deepshikhap9877@gmail.com',
      to: newUser.email,
      subject: 'Welcome to PMS',
      html: `<div>
        <h1 style="text-align:center">Project Management System</h1>
        
        <h3>Welcome! Your registration has been successfully completed.</h3>
        Hi ${newUser.empname},
        <br/>
        This application helps your team generate, organize, track your projects. <br/>
        You are able to check projects assigned to you and can send daily remarks on the progress of the project.
        <br/><br/>
        Here are your details for reference:
        <ul>
          <li>Name: ${newUser.empname}</li>
          <li>Email: ${newUser.email}</li>
          <li>Phone Number: ${newUser.phoneNo}</li>
        </ul>
        <br/>
        If you have any questions or need further assistance, please don't hesitate to reach out to us.
        <br/><br/>
        We look forward to your contributions and wish you great success in your new role.
        <br/><br/>
        Best regards,<br/>
        Project Management System Team
      </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Forgot password route

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('jobRole', 'name');
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Decrypt the password
    const decryptedPassword = CryptoJS.AES.decrypt(password, 'your_secret_key').toString(CryptoJS.enc.Utf8);
    console.log(decryptedPassword, 'decryptedPassword')
    const isPasswordValid = await bcrypt.compare(decryptedPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, jobRole: user.jobRole.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, userId: user._id, jobRole: user.jobRole.name });
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a new random password
    const randomPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Update user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Send email with the new password
    const mailOptions = {
      from: 'deepshikhap9877@gmail.com',
      to: user.email,
      subject: 'Your New Password',
      html: `<div>
        <h1 style="text-align:center">Project Management System</h1>
        <h3>Your password has been reset successfully.</h3>
        <p>Hi ${user.firstName},</p>
        <p>Your new password is: <strong>${randomPassword}</strong></p>
        <p>Please log in using this new password. Once logged in, you can change it from your profile page.</p>
        <br/>
        <p>Best regards,<br/>Project Management System Team</p>
      </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'New password sent to your email address' });
      }
    });
  } catch (error) {
    console.error('Error processing forgot password:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/change-password', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Decrypt the passwords
    const decryptedCurrentPassword = CryptoJS.AES.decrypt(currentPassword, 'your_secret_key').toString(CryptoJS.enc.Utf8);
    const decryptedNewPassword = CryptoJS.AES.decrypt(newPassword, 'your_secret_key').toString(CryptoJS.enc.Utf8);

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the new password is the same as the current password
    if (await bcrypt.compare(decryptedNewPassword, user.password)) {
      return res.status(400).json({ error: 'You cannot set your current password as new password' });
    }

    // Validate the current password
    const isPasswordValid = await bcrypt.compare(decryptedCurrentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Validate the new password
    if (!validatePassword(decryptedNewPassword)) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(decryptedNewPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});
router.get('/name/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user's name in the response
    res.json({ name: user.empname });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
