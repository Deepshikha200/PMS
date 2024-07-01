

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const nodemailer = require('nodemailer');
// const CryptoJS = require('crypto-js');
// const Project = require('../models/Project');
// const JobRole = require('../models/jobRoles');
// const Report = require('../models/Report');

// const JWT_SECRET = 'your_jwt_secret_key';

// const validateEmailDomain = (email) => /@antiersolutions\.com$/.test(email);

// const validatePassword = (password) => {
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return passwordRegex.test(password);
// };

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'deepshikhap9877@gmail.com',
//     pass: 'hovn iwsc hjbf iusz',
//   },
// });

// // Function to generate a random password
// const generateRandomPassword = (length = 10) => {
//   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';
//   let password = '';
//   for (let i = 0; i < length; i++) {
//     password += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return password;
// };

// router.post('/signup', async (req, res) => {
//   const { empname, email, empid, phoneNo, jobRole, password } = req.body;

//   // Check if email already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ error: 'Email already exists' });
//   }

//   const existingEmpId = await User.findOne({ empid });
//   if (existingEmpId) {
//     return res.status(400).json({ error: 'Employee ID already exists' });
//   }

//   // Validation for empname: only letters allowed
//   const empnameRegex = /^[a-zA-Z\s]+$/;
//   if (!empname.match(empnameRegex)) {
//     return res.status(400).json({ error: 'Name must contain only letters and spaces' });
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
//     empname,
//     email,
//     empid,
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
//         Hi ${newUser.empname},
//         <br/>
//         This application helps your team generate, organize, track your projects. <br/>
//         You are able to check projects assigned to you and can send daily remarks on the progress of the project.
//         <br/><br/>
//         Here are your details for reference:
//         <ul>
//           <li>Name: ${newUser.empname}</li>
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
//       return res.status(400).json({ error: 'User not found' });
//     }

//     // Decrypt the password
//     const decryptedPassword = CryptoJS.AES.decrypt(password, 'your_secret_key').toString(CryptoJS.enc.Utf8);
//     console.log(decryptedPassword , 'decryptedPassword')
//     const isPasswordValid = await bcrypt.compare(decryptedPassword, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: 'Invalid password' });
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

// // Forgot password route
// router.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Generate a new random password
//     const randomPassword = generateRandomPassword();
//     const hashedPassword = await bcrypt.hash(randomPassword, 10);

//     // Update user's password in the database
//     user.password = hashedPassword;
//     await user.save();

//     // Send email with the new password
//     const mailOptions = {
//       from: 'deepshikhap9877@gmail.com',
//       to: user.email,
//       subject: 'Your New Password for Antier Solutions',
//       html: `<div>
//         <h1 style="text-align:center">Antier Solutions</h1>
//         <h3>Your password has been reset successfully.</h3>
//         <p>Hi ${user.firstName},</p>
//         <p>Your new password is: <strong>${randomPassword}</strong></p>
//         <p>Please log in using this new password. Once logged in, you can change it from your profile page.</p>
//         <br/>
//         <p>Best regards,<br/>Antier Solutions Team</p>
//       </div>`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Error sending email:', error);
//         return res.status(500).json({ error: 'Error sending email' });
//       } else {
//         console.log('Email sent:', info.response);
//         return res.status(200).json({ message: 'New password sent to your email address' });
//       }
//     });
//   } catch (error) {
//     console.error('Error processing forgot password:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.post('/change-password', async (req, res) => {
//   const { userId, currentPassword, newPassword } = req.body;

//   if (!userId || !currentPassword || !newPassword) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Validate the current password
//     const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: 'Current password is incorrect' });
//     }

//     // Validate the new password
//     if (!validatePassword(newPassword)) {
//       return res.status(400).json({ error: 'New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
//     }

//     // Hash the new password
//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password
//     user.password = hashedNewPassword;
//     await user.save();

//     return res.status(200).json({ message: 'Password changed successfully' });
//   } catch (error) {
//     console.error('Error changing password:', error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// router.post('/add-jobRole', async (req, res) => {
//   const { name } = req.body;

//   try {
//     const existingJobRole = await JobRole.findOne({ name });
//     if (existingJobRole) {
//       return res.status(400).json({ error: 'Job role already exists' });
//     }

//     const jobRole = new JobRole({ name });
//     await jobRole.save();

//     return res.status(201).json({ message: 'Job role added successfully', jobRole });
//   } catch (error) {
//     console.error('Error adding job role:', error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/reports', async (req, res) => {
//   try {
//     const reports = await Report.find();
//     res.json(reports);
//   } catch (error) {
//     console.error('Error fetching reports:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/job-roles', async (req, res) => {
//   try {
//     const jobRoles = await JobRole.find();
//     res.json(jobRoles);
//   } catch (error) {
//     console.error('Error fetching job roles:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/projects', async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const Project = require('../models/Project');
const JobRole = require('../models/jobRoles');
const Report = require('../models/Report');

const JWT_SECRET = 'my_jwt_secret_key';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'deepshikhap9877@gmail.com',
    pass: 'hovn iwsc hjbf iusz',
  },
});

router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find().populate('projectName').populate('employeeId');
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Error fetching reports' });
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


router.get('/empname', async (req, res) => {
  try {
    const users = await User.find().select('empname jobRole empid'); // Include jobRole for completeness
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/projectUpdate/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status, hourlyRate, budget, team } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    project.name = name || project.name;
    project.status = status || project.status;
    project.hourlyRate = hourlyRate || project.hourlyRate;
    project.budget = budget || project.budget;

    const existingTeam = project.team.map(member => ({
      jobRole: member.jobRole,
      empname: member.empname.empname,
      empid: member.empid.empid
    }));

    // Merge updated team members with existing team
    const updatedTeam = existingTeam.map(existingMember => {
      const updatedMember = team.find(newMember => newMember.empid === existingMember.empid);
      return updatedMember || existingMember;
    });

    // Add new members to the team if they are not already present
    team.forEach(newMember => {
      if (!updatedTeam.find(member => member.empid === newMember.empid)) {
        updatedTeam.push(newMember);
      }
    });

    project.team = updatedTeam.map(member => ({
      jobRole: member.jobRole,
      empname: { empname: member.empname }, // Adjust based on your schema
      empid: { empid: member.empid } // Adjust based on your schema
    }));

    const updatedProject = await project.save();

    // Update the users' project lists
    for (const member of team) {
      await User.findByIdAndUpdate(
        member.empid,
        { $addToSet: { projects: project._id } },
        { new: true }
      );
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: error });
  }
});

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

router.delete('/report/:id', async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    await Report.findByIdAndDelete(reportId);
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Server error' });
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


router.post('/addreport', async (req, res) => {
  const { projectName, employeeId, employeeName, jobRole, date, logHours, remarks, createdBy } = req.body;

  // Validate input data
  if (!projectName || !employeeId || !employeeName || !jobRole || !date) {
    return res.status(400).json({ error: 'Please fill in all required fields' });
  }

  try {
    // Create a new report
    const newReport = new Report({
      projectName,
      employeeId,
      employeeName,
      jobRole,
      date,
      logHours,
      remarks,
      createdBy
    });

    // Save the report to the database
    await newReport.save();
    await User.findByIdAndUpdate(createdBy, { $push: { projects: newReport._id } }, { new: true });

    // for (const member of team) {
    //   await User.findByIdAndUpdate(member.empid, { $push: { projects: newReport._id } }, { new: true });
    // }

    res.status(201).json({ message: 'Report added successfully' });
  } catch (error) {
    console.error('Error adding report:', error);
    res.status(500).json({ error: 'Error adding report' });
  }
});
// get the project according to the user


router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userProjects = await Project.find({ createdBy: userId })
      .populate('createdBy', 'empname') // Fetching empname
      .populate({
        path: 'team.jobRole',
        select: 'name'
      })
      .populate({
        path: 'team.empname',
        select: 'empname empid'
      });

    const formattedProjects = userProjects.map(project => ({
      ...project._doc,
      createdBy: project.createdBy.empname,
      team: project.team.map(member => ({
        jobRole: member.jobRole ? member.jobRole.name : '',
        name: member.empname ? member.empname.empname : '',
        empid: member.empname ? member.empname.empid : ''

      }))
    }));

    res.json(formattedProjects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
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

// get all the projects
router.get('/projects', async (req, res) => {
  try {
    const user = await Project.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





router.get('/employeeById/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await User.findById(id).populate('jobRole', 'name');

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ empid: employee.empid, name: employee.empname, jobRole: employee.jobRole.name });
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/developer/:developerId', async (req, res) => {
  const { developerId } = req.params;

  try {
    const projects = await Project.find({ 'team.empid': developerId }).populate('team.empid', 'empid').populate('createdBy', 'empname');
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects for developer:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




router.get('/reports/developer/:developerId', async (req, res) => {
  const { developerId } = req.params;

  try {
    const reports = await Report.find({ employeeId: developerId })
      .populate('projectName', 'name')
      .populate('employeeId', 'empname empid');

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports for developer:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
});


router.get('/project/members/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId).select('team').populate('team.empid', 'empid');

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ team: project.team });
  } catch (error) {
    console.error('Error fetching project members:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.get('/developer/projects/:developerId', async (req, res) => {
  const { developerId } = req.params;
  try {
    const projects = await Project.find({
      'team.empid': developerId
    });

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/reports/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reportId = await Report.findById(id);

    res.status(200).json(reportId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/reports/:id', async (req, res) => {
  const { id } = req.params;
  const { loghours, date, remarks } = req.body;
  try {

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { loghours, date, remarks },
      { new: true, runValidators: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Error updating report' });
  }
});

router.get('/reports/pm/:pmId', async (req, res) => {
  const { pmId } = req.params;

  try {
    const reports = await Report.find({
      $or: [
        { createdBy: pmId },
        { employeeId: pmId }
      ]
    })
      .populate('projectName', 'name')
      .populate('employeeId', 'empname empid');
    console.log(reports, 'reports')
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports for PM:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
});
router.get('/reports/employee/:employeeId', async (req, res) => {
  const { employeeId } = req.params;

  try {
    const reports = await Report.find({
      $or: [
        { createdBy: employeeId },
        { employeeId: employeeId }
      ]
    })
      .populate('projectName', 'name')
      .populate('employeeId', 'empname empid');
    console.log(reports, 'reports');
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports for employee:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
});


router.post('/projects', async (req, res) => {
  try {
    const { name, status, hourlyRate, budget, team, createdBy } = req.body;

    // Create a new Project document
    const newProject = new Project({
      name,
      status,
      hourlyRate,
      budget,
      team,
      reports,
      createdBy
    });

    // Save the new Project
    await newProject.save();

    // Update the createdBy user's projects array to include the new Project's _id
    await User.findByIdAndUpdate(createdBy, { $push: { projects: newProject._id } }, { new: true });
    await Report.findByIdAndUpdate(reports, { $push: { reports: newProject._id } }, { new: true });

    // Update each team member's projects array to include the new Project's _id
    for (const member of team) {
      await User.findByIdAndUpdate(member.empid, { $push: { projects: newProject._id } }, { new: true });
    }

    // Respond with the newly created Project
    res.status(201).json(newProject);
  } catch (error) {
    // Handle any errors
    console.error('Error creating project:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { Autocomplete } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Textarea from '@mui/joy/Textarea';
import dayjs from 'dayjs';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddReport({ onReportAdded, currentReport }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [projectNames, setProjectNames] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState('');
  const [selectedEmployeeJobRole, setSelectedEmployeeJobRole] = useState('');
  const [remarks, setRemarks] = useState('');
  const [logHours, setLogHours] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found. Please login.');
        return;
      }

      try {
        const projectsResponse = await axios.get(`http://localhost:5050/api/user/${userId}`);
        setProjectNames(projectsResponse.data.map(project => ({ label: project.name, id: project._id })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    if (currentReport) {
      setSelectedDate(dayjs(currentReport.date));
      setSelectedProject({ label: currentReport.projectName.name, id: currentReport.projectName._id });
      setSelectedEmployeeId({ label: currentReport.employeeId.empid, id: currentReport.employeeId._id });
      setSelectedEmployeeName(currentReport.employeeName);
      setSelectedEmployeeJobRole(currentReport.jobRole.name);
      setLogHours(currentReport.logHours || '');
      setRemarks(currentReport.remarks || '');
    }
  }, [currentReport]);

  const handleProjectChange = async (event, value) => {
    if (!value) return;

    try {
      setSelectedProject(value);

      const response = await axios.get(`http://localhost:5050/api/project/members/${value.id}`);
      const employeeOptions = response.data.team.map(member => ({
        label: `${member.empid.empid}`,
        id: member.empid._id
      }));
      setEmployeeId(employeeOptions);
    } catch (error) {
      console.error('Error fetching project members:', error);
    }
  };

  const handleEmployeeIdChange = async (event, value) => {
    if (!value) return;

    try {
      setSelectedEmployeeId(value.id);

      const response = await axios.get(`http://localhost:5050/api/employeeById/${value.id}`);
      const { name, jobRole } = response.data;
      setSelectedEmployeeName(name);
      setSelectedEmployeeJobRole(jobRole.name);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setLogHours(inputValue);

    const regex = /^([01]?[0-9]|2[0-3])\.[0-5][0-9]$/; // Regex for hh.mm format
    if (regex.test(inputValue)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAddReport = async () => {
    if (!selectedProject || !selectedEmployeeId || !selectedEmployeeName || !selectedEmployeeJobRole || !selectedDate || !logHours || error) {
      toast.error('Please fill in all required fields with valid data.');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please login to create or update a report.');
      return;
    }

    const reportData = {
      projectName: selectedProject.id,
      employeeId: selectedEmployeeId,
      employeeName: selectedEmployeeName,
      jobRole: selectedEmployeeJobRole,
      date: selectedDate.format('YYYY-MM-DD'),
      logHours,
      remarks,
      createdBy: userId,
    };

    try {
      if (currentReport) {
        await axios.put(`http://localhost:5050/api/reports/${currentReport._id}`, reportData);
        toast.success('Report updated successfully!');
      } else {
        await axios.post('http://localhost:5050/api/addreport', reportData);
        toast.success('Report added successfully!');
      }

      if (onReportAdded) {
        onReportAdded();
      }
    } catch (error) {
      console.error('Error adding/updating report:', error);
      toast.error('Failed to add/update report.');
    }
  };

  return (
    <div className='addreport'>
      <ToastContainer />
      <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 435 }}>
        <Autocomplete
          options={projectNames}
          getOptionLabel={(option) => option.label}
          onChange={handleProjectChange}
          value={selectedProject}
          disabled={!!currentReport}
          renderInput={(params) => (
            <TextField {...params} label="Project Name" variant="outlined" />
          )}
        />
      </FormControl>

      <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 200 }}>
        <Autocomplete
          options={employeeId}
          getOptionLabel={(option) => option.label}
          onChange={handleEmployeeIdChange}
          value={employeeId.find(emp => emp.id === selectedEmployeeId) || null}
          disabled={!!currentReport}
          renderInput={(params) => <TextField {...params} label="Emp ID" />}
        />
      </FormControl>

      <FormControl sx={{ m: 1, ml: 2, mt: 2, width: 200 }}>
        <TextField
          label="Employee Name"
          variant="outlined"
          value={selectedEmployeeName}
          disabled
        />
      </FormControl>

      <FormControl sx={{ m: 1, ml: 2, mt: 2, width: 200 }}>
        <TextField
          label="Job Role"
          variant="outlined"
          value={selectedEmployeeJobRole}
          disabled
        />
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl sx={{ m: 1, ml: 2, mt: 2, width: 200 }}>
          <DesktopDatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>
      </LocalizationProvider>

      <FormControl sx={{ m: 1, ml: 2, mt: 2, mb: 2, minWidth: 435 }}>
        <TextField
          label="Log Hours"
          variant="outlined"
          placeholder="hh.mm"
          value={logHours}
          onChange={handleChange}
          error={error}
          helperText={error ? 'Invalid time format. Use hh.mm' : ''}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ m: 1, ml: 2, minWidth: 435 }}>
        <Textarea
          className="remarks"
          placeholder="Remarks"
          minRows={3}
          maxRows={6}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </FormControl>

      <Button
        className="addbtn float-end me-5 mt-3 mb-3"
        variant="contained"
        onClick={handleAddReport}
      >
        {currentReport ? 'Update' : 'Add'}
      </Button>
    </div>
  );
}
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


router.post('/signup', async (req, res) => {
  const { empname, email, empid, phoneNo, jobRole, password } = req.body;

  // Decrypt the password
  const decryptedPassword = CryptoJS.AES.decrypt(password, 'your_secret_key').toString(CryptoJS.enc.Utf8);

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
    return res.status(400).json({ error: 'Invalid email domain. Please use an email address with @antiersolutions.com domain' });
  }

  // Validation for password
  if (!validatePassword(decryptedPassword)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(decryptedPassword, 10);

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
      subject: 'Welcome to Antier Solutions!',
      html: `<div>
        <h1 style="text-align:center">Antier Solutions</h1>
        <img src="email.svg" alt="Welcome Image" style="max-width:500px;">
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



//get the report according to the user
router.get('/reports/createdBy/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const reports = await Report.find({ createdBy: userId })
      .populate('projectName', 'name') // Fetch the project name
      .populate('employeeId', 'empname empid'); // Fetch the empname and empid of the employee

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports created by user:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
});



router.get('/reports/developer/:developerId', async (req, res) => {
  const { developerId } = req.params;

  try {
    const reports = await Report.find({ employeeId: developerId })
      .populate('projectName', 'name')
      .populate('employeeId', 'empname empid');

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports for developer:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
});


router.get('/reports/pm/:pmId', async (req, res) => {
  const { pmId } = req.params;

  try {
    const reports = await Report.find({
      $or: [
        { createdBy: pmId },
        { employeeId: pmId }
      ]
    })
      .populate('projectName', 'name')
      .populate('employeeId', 'empname empid');

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports for PM:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
});