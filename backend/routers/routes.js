const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
// const crypto = require('crypto');
const Project = require('../models/Project');

const Team = require("../models/Team")


const validateEmailDomain = (email) => /@antiersolutions\.com$/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// const generateRandomPassword = () => crypto.randomBytes(8).toString('hex');

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your own secret key

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'deepshikhap9877@gmail.com',
    pass: 'hovn iwsc hjbf iusz',
  },
});


router.get('/teams', async (req, res) => {
  try {
    const newTeam = await Team.find();
    res.status(200).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/email', async (req, res) => {
  try {
    const users = await User.find().select('email');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/teams', async (req, res) => {
  const { name } = req.body;
  const newTeam = new Team({
    name
  });

  try {
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// GET /api/teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Route to handle user registration
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phoneNo, jobRole, password } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // Validation for name: only letters allowed
  const nameRegex = /^[a-zA-Z]+$/;
  if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
    return res.status(400).json({ error: 'First name and last name must contain only letters' });
  }

  // Validation for email domain
  if (!validateEmailDomain(email)) {
    return res.status(400).json({ error: 'Invalid email domain. Please use an email address with @antiersolutions.com domain' });
  }

  // Validation for password
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
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
      subject: 'Welcome to Antier Solutions!',
      html: `<div>
        <h1 style="text-align:center">Antier Solutions</h1>
        <img src="email.svg" alt="Welcome Image" style="max-width:500px;">
        <h3>Welcome! Your registration has been successfully completed.</h3>
        Hi ${newUser.firstName},
        <br/>
        This application helps your team generate, organize, track your projects. <br/>
        You are able to check projects assigned to you and can send daily remarks on the progress of the project.
        <br/><br/>
        Here are your details for reference:
        <ul>
          <li>Name: ${newUser.firstName} ${newUser.lastName}</li>
          <li>Email: ${newUser.email}</li>
          <li>Phone Number: ${newUser.phoneNo}</li>
          <li>Job Role: ${newUser.jobRole}</li>
        </ul>
        <br/>
        If you have any questions or need further assistance, please don't hesitate to reach out to us.
        <br/><br/>
        We look forward to your contributions and wish you great success in your new role.
        <br/><br/>
        Best regards,<br/>
        Antier Solutions Team
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

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ userId: user._id, email: user.email, jobRole: user.jobRole }, JWT_SECRET, { expiresIn: '1h' });

//     // res.json({ message: 'Login successful', token }); // Send token in response
//     res.json({ message: 'Login successful', token, userId: user._id }); // Send userId along with the token

//     res.json({ message: 'Login successful', token, jobRole: user.jobRole });
//   } catch (error) {
//     res.status(500).json({ error: 'An unexpected error occurred' });
//   }
// });


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, jobRole: user.jobRole },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, jobRole: user.jobRole, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

router.get('/members/:jobRole', async (req, res) => {
  try {
    const { jobRole } = req.params;
    const members = await User.find({ jobRole });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/employees', async (req, res) => {
  try {
    const employees = await User.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

router.get('/jobrole', async (req, res) => {
  try {

    const jobRole = await User.find().select('jobRole');
    res.status(200).json(jobRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});
module.exports = router;



