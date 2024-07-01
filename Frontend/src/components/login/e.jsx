const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const JobRole = require('../models/jobRoles');
const Report = require('../models/Report');
const CryptoJS = require('crypto-js');

const validateEmailDomain = (email) => /@antiersolutions\.com$/.test(email);
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
const JWT_SECRET = 'your_jwt_secret_key';
const SECRET_KEY = 'your_secret_key';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'deepshikhap9877@gmail.com',
    pass: 'hovn iwsc hjbf iusz',
  },
});

const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('jobRole', 'name');
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const decryptedPassword = decryptPassword(password);
    const isPasswordValid = await bcrypt.compare(decryptedPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
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

module.exports = router;
