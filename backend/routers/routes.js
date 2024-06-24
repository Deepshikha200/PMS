const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const Project = require('../models/Project');
const JobRole = require('../models/jobRoles');
const Report = require('../models/Report');

const JWT_SECRET = 'your_jwt_secret_key';

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

router.get('/reports/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const reports = await Report.find({ employeeId: userId }).populate('projectName', 'name');
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
});


router.post('/addreport', async (req, res) => {
  const { projectName, employeeId, employeeName, jobRole, date, logHours, remarks } = req.body;

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
    });

    // Save the report to the database
    await newReport.save();
    res.status(201).json({ message: 'Report added successfully' });
  } catch (error) {
    console.error('Error adding report:', error);
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


router.get('/empname', async (req, res) => {
  try {
    const users = await User.find().select('empname jobRole empid'); // Include jobRole for completeness
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      createdBy
    });

    // Save the new Project
    await newProject.save();

    // Update the createdBy user's projects array to include the new Project's _id
    await User.findByIdAndUpdate(createdBy, { $push: { projects: newProject._id } }, { new: true });

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


router.put('/projectUpdate/:id', async (req, res) => {
  const projectId = req.params.id;
  const { name, status, hourlyRate, budget, team, createdBy } = req.body;

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update the project's details
    project.name = name;
    project.status = status;
    project.hourlyRate = hourlyRate;
    project.budget = budget;
    project.team = team;
    project.createdBy = createdBy;

    // Save the updated project
    const updatedProject = await project.save();

    // Update the user who created the project
    await User.findByIdAndUpdate(createdBy, { $addToSet: { projects: updatedProject._id } }, { new: true });

    // Update each team member with the project ID
    for (const member of team) {
      await User.findByIdAndUpdate(member.empid, { $addToSet: { projects: updatedProject._id } }, { new: true });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Server error' });
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
});

router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id)
      .populate({
        path: 'team.empname team.empid', // Populate both empname and empid
        select: 'empname empid', // Select only empname and empid fields
      });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status, hourlyRate, budget, team } = req.body;

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
    console.log(updatedProject, 'updatedProjectupdatedProject')
    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Server error' });
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


module.exports = router;



