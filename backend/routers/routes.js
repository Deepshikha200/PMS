const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const Project = require('../models/Project');
const JobRole = require('../models/jobRoles');
const Report = require('../models/Report');


const Team = require("../models/Team")
const validateEmailDomain = (email) => /@antiersolutions\.com$/.test(email);

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

// Forgot password route
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
      subject: 'Your New Password for Antier Solutions',
      html: `<div>
        <h1 style="text-align:center">Antier Solutions</h1>
        <h3>Your password has been reset successfully.</h3>
        <p>Hi ${user.firstName},</p>
        <p>Your new password is: <strong>${randomPassword}</strong></p>
        <p>Please log in using this new password. Once logged in, you can change it from your profile page.</p>
        <br/>
        <p>Best regards,<br/>Antier Solutions Team</p>
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


router.get('/developer/projects/:developerId', async (req, res) => {
  const { developerId } = req.params;
  try {
    const projects = await Project.find({
      team: { $elemMatch: { member: developerId } }
    }, 'name createdBy team').populate('createdBy', 'firstName lastName').populate('team', 'firstName lastName');

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.post('/addreport', async (req, res) => {
  try {
    const { projectName, employeeName, jobRole, date, shiftStart, shiftEnd, remarks } = req.body;

    // Validate input data
    if (!projectName || !employeeName || !jobRole || !date || !shiftStart || !shiftEnd) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    // Ensure project and employee exist
    const project = await Project.findById(projectName);
    const employee = await User.findById(employeeName);

    if (!project || !employee) {
      return res.status(404).json({ error: 'Project or employee not found' });
    }

    // Create new report
    const newReport = new Report({
      projectName,
      employeeName,
      jobRole,
      date,
      shiftStart,
      shiftEnd,
      remarks,
    });

    // Save report to database
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    console.error('Error adding report:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('projectName', 'name')
      .populate('employeeName', 'email')
      .populate({
        path: 'jobRole',
        select: 'name'
      });

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create a new job role
router.post('/jobrole', async (req, res) => {
  const { name } = req.body;
  const newJob = new JobRole({ name });

  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
    const users = await User.find().select('email jobRole'); // Include jobRole for completeness
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
// router.post('/signup', async (req, res) => {
//   const { firstName, lastName, email, phoneNo, jobRole, password } = req.body;

//   // Check if email already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ error: 'Email already exists' });
//   }

//   // Validation for name: only letters allowed
//   const nameRegex = /^[a-zA-Z]+$/;
//   if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
//     return res.status(400).json({ error: 'First name and last name must contain only letters' });
//   }

//   // Validation for email domain
//   if (!validateEmailDomain(email)) {
//     return res.status(400).json({ error: 'Invalid email domain. Please use an email address with @antiersolutions.com domain' });
//   }

//   // Validation for password
//   if (!validatePassword(password)) {
//     return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
//   }

//   // Hash the password before saving
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     firstName,
//     lastName,
//     email,
//     phoneNo,
//     jobRole,
//     password: hashedPassword,
//   });

//   try {
//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully', user: newUser });

//     // Send welcome email
//     const mailOptions = {
//       from: 'deepshikhap9877@gmail.com',
//       to: newUser.email,
//       subject: 'Welcome to Antier Solutions!',
//       html: `<div>
//         <h1 style="text-align:center">Antier Solutions</h1>
//         <img src="email.svg" alt="Welcome Image" style="max-width:500px;">
//         <h3>Welcome! Your registration has been successfully completed.</h3>
//         Hi ${newUser.firstName},
//         <br/>
//         This application helps your team generate, organize, track your projects. <br/>
//         You are able to check projects assigned to you and can send daily remarks on the progress of the project.
//         <br/><br/>
//         Here are your details for reference:
//         <ul>
//           <li>Name: ${newUser.firstName} ${newUser.lastName}</li>
//           <li>Email: ${newUser.email}</li>
//           <li>Phone Number: ${newUser.phoneNo}</li>
//         </ul>
//         <br/>
//         If you have any questions or need further assistance, please don't hesitate to reach out to us.
//         <br/><br/>
//         We look forward to your contributions and wish you great success in your new role.
//         <br/><br/>
//         Best regards,<br/>
//         Antier Solutions Team
//       </div>`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Error sending email:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });



// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email }).populate('jobRole', 'name');
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign(
//       { userId: user._id, email: user.email, jobRole: user.jobRole.name },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({ message: 'Login successful', token, userId: user._id, jobRole: user.jobRole.name });
//   } catch (error) {
//     res.status(500).json({ error: 'An unexpected error occurred' });
//   }
// });


router.get('/members/:jobRole', async (req, res) => {
  try {
    const { jobRole } = req.params;
    const members = await User.find({ jobRole }).populate('jobRole', 'name');

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/employees', async (req, res) => {
  try {
    // const employees = await User.find({});
    const employees = await User.find({}).populate('jobRole', 'name');

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});


// GET all job roles
router.get('/jobrole', async (req, res) => {
  try {
    const jobRoles = await JobRole.find();
    res.status(200).json(jobRoles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job roles' });
  }
});


router.post('/projects', async (req, res) => {
  try {
    const { name, status, hourlyRate, budget, team, createdBy } = req.body;
    const newProject = new Project({
      name,
      status,
      hourlyRate,
      budget,
      team,
      createdBy
    });
    console.log(newProject, 'req.bodyreq.bodyreq.body')

    await newProject.save();

    // Update the user to include the created project
    await User.findByIdAndUpdate(createdBy, { $push: { projects: newProject._id } });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});




// Route to get all projects

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy');
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userProjects = await Project.find({ createdBy: userId })
      .populate('createdBy', 'firstName lastName') // Fetching both firstName and lastName
      .populate({
        path: 'team.member',
        select: 'firstName lastName',
      })
      .populate({
        path: 'team.jobRole',
        select: 'name', 
      })
      .populate({
        path: 'team.team',
        select: 'name', 
      });

    const formattedProjects = userProjects.map(project => ({
      ...project._doc,
      createdBy: `${project.createdBy.firstName} ${project.createdBy.lastName}`,
      team: project.team ? project.team.name : '',
      team: project.team.map(member => ({
        jobRole: member.jobRole ? member.jobRole.name : '',
        name: member.member ? `${member.member.firstName} ${member.member.lastName}` : '',
      })),
    }));

    console.log(formattedProjects, 'formattedProjectsformattedProjects')

    res.json(formattedProjects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});


router.post('/change-password', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate the current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Validate the new password
    if (!validatePassword(newPassword)) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// DELETE a project by ID
router.delete('/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find the project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Remove the project reference from users
    await User.updateMany(
      { projects: projectId },
      { $pull: { projects: projectId } }
    );

    // Delete the project
    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/projects/:id', async (req,res)=>{
  const {id } = req.params;
  try {
    const user = await Project.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status, hourlyRate, budget, team } = req.body;

  // Validate input data
  if (!name || !status || !hourlyRate || !budget || !team) {
    return res.status(400).json({ error: 'Please fill in all required fields' });
  }

  try {
    // Find the project by ID
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update the project's details
    project.name = name;
    project.status = status;
    project.hourlyRate = hourlyRate;
    project.budget = budget;
    project.team = team;

    // Save the updated project
    const updatedProject = await project.save();

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;


