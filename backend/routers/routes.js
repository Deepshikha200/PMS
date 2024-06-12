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

const JWT_SECRET = 'your_jwt_secret_key';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'deepshikhap9877@gmail.com',
    pass: 'hovn iwsc hjbf iusz',
  },
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


// router.get('/reports', async (req, res) => {
//   try {
//     const reports = await Report.find();
//     res.json(reports);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching reports' });
//   }
// });

router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('projectName', 'name')  // Assuming projectName refers to a Project ID
      .populate('employeeName', 'empname');  // Assuming employeeName refers to a User ID
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reports' });
  }
});


router.post('/addreport', async (req, res) => {
  const { projectName, employeeName, jobRole, date, logHours, remarks } = req.body;

  if (!projectName || !employeeName || !jobRole || !date || !logHours) {
    return res.status(400).json({ error: 'Please fill in all required fields' });
  }

  try {
    const newReport = new Report({
      projectName,
      employeeName,
      jobRole,
      date,
      logHours,
      remarks,
    });

    await newReport.save();
    res.status(201).json({ message: 'Report added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding report' });
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

router.get('/empname', async (req, res) => {
  try {
    const users = await User.find().select('empname jobRole empid'); // Include jobRole for completeness
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


// Route to get all projects


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

    await newProject.save();

    await User.findByIdAndUpdate(createdBy, { $push: { projects: newProject._id } });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, hourlyRate, budget, team, createdBy } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, status, hourlyRate, budget, team, createdBy },
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
})


// get the project by id 
router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
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



router.get('/projectFind', async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({ error: 'Project ID is required' });
  }

  try {
    // Find the project with the specified ID and populate the employees
    const project = await Project.findById(projectId).populate('empname');

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Send the list of employees assigned to this project
    res.json(project.employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/employeeById/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await User.findById(id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ empid: employee.empid, name: employee.empname, jobRole: employee.jobRole });
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;


