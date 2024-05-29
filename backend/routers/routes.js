const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Helper functions
const validateEmailDomain = (email) => /@antiersolutions\.com$/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const generateRandomPassword = () => crypto.randomBytes(8).toString('hex');

// JWT secret key
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your own secret key

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'deepshikhap9877@gmail.com',
    pass: 'hovn iwsc hjbf iusz',
  },
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
      to: user.email,
      subject: 'Welcome to Antier Solutions!',
      text: `<div style="border=2px solid black">
      <h1 style="text-align:center">Antier Solutions</h1>
      <img src="email.svg" alt="Welcome Image" style="max-width:500px;">
     <h3> Welcome!Your registration has been successfully completed.</h3>
      Hi ${newUser.firstName},
 
      This application helps your team generate, organize, track your projects. <br/>
       You are able to check projects assigned to you and can send daily remarks on the progress of the project.
      
      Here are your details for reference:
      - Name: ${newUser.firstName} ${newUser.lastName}
      - Email: ${newUser.email}
      - Phone Number: ${newUser.phoneNo}
      - Job Role: ${newUser.jobRole}
      
      If you have any questions or need further assistance, please don't hesitate to reach out to us.
      
      We look forward to your contributions and wish you great success in your new role.
      
      Best regards,
      Antier Solutions Team
      </div>`,
      
   
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

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

//     res.json({ message: 'Login successful', token }); // Send token in response
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

    const token = jwt.sign({ userId: user._id, email: user.email,jobRole: user.jobRole }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });

    res.json({ message: 'Login successful' ,token,jobRole: user.jobRole});
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
  res.json({ message: 'Logout successful' });
});


router.get('/employees', async (req, res) => {
  try {
    const employees = await User.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

router.get('/jobrole' , async (req,res) => 
{
  try {
    const jobRole = await User.find({jobRole});
    res.status(200).json(jobRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

router.post('/forgotpassword',async(req,res)=>{
  const {email, firstName}=req.body;
  try {
    const user = await User.findOne({ email }); 
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const randomPassword = generateRandomPassword();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);
    user.password = hashedPassword;
    await user.save();
    const newUser = new User({
      firstName,
      email,
     
    });
    const mailOptions = {
      from: 'deepshikhap9877@gmail.com',
      to: user.email,
      subject: 'Reset Password',
      text: `Hi ${newUser.firstName}
      \n we received a request to reset your password, Here we are providing you with your new password . After loggin in you can change your password from your profile.
      Password : ${randomPassword}
      If you have any questions or need further assistance, please don't hesitate to reach out to us.
      
      We look forward to your contributions and wish you great success in your new role.
      
      Best regards,
      Antier Solutions Team
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Password reset email sent successfully' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;
