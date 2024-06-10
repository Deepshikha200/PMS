// import React, { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import FormControl from '@mui/material/FormControl';
// import { Link } from 'react-router-dom';
// import './Createproject.css';
// import { Autocomplete } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function CreateProject({ onProjectCreated, isEditing, projectData, selectedProject }) {
//   const [projectName, setProjectName] = useState('');
//   const [status, setStatus] = useState('');
//   const [hourlyRate, setHourlyRate] = useState('');
//   const [budget, setBudget] = useState('');
//   const [rows, setRows] = useState([{ id: 1, jobRole: '', empname: '', empid: '' }]);
//   const [availableMembers, setAvailableMembers] = useState([]);
//   const [jobRoles, setJobRoles] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const membersResponse = await axios.get('http://localhost:5050/api/empname');
//         const jobRolesResponse = await axios.get('http://localhost:5050/api/jobrole');
        
//         setAvailableMembers(membersResponse.data);
//         setJobRoles(jobRolesResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (projectData) {
//       setProjectName(projectData.ProjectName || '');
//       setStatus(projectData.status || '');
//       setHourlyRate(projectData.hourlyRate || '');
//       setBudget(projectData.budget || '');
//       setRows(projectData ? projectData.map((member, index) => ({
//         id: index + 1,
//         jobRole: member.jobRole || '',
//         empname: member.empname || '',
//         empid: member.empid || ''
//       })) : [{ id: 1, jobRole: '', empname: '', empid: '' }]);
//     }
//   }, [projectData]);

//   const handleAddRow = () => {
//     const newRow = { id: rows.length + 1, jobRole: '', empname: '', empid: '' };
//     setRows([...rows, newRow]);
//   };

//   const handleDeleteRow = (idToDelete) => {
//     const updatedRows = rows.filter((row) => row.id !== idToDelete);
//     setRows(updatedRows);
//   };

//   const handleChange = (id, field, value) => {
//     if (field === 'empname') {
//       const selectedMember = availableMembers.find(member => member.empname === value);
//       value = selectedMember ? selectedMember._id : '';
//     }
//     if (field === 'empid') {
//       const selectedMember = availableMembers.find(member => member.empid === value);
//       value = selectedMember ? selectedMember._id : '';
//     }

//     const updatedRows = rows.map((row) =>
//       row.id === id ? { ...row, [field]: value } : row
//     );
    
//     setRows(updatedRows);
//   };

//   const handleCreateProject = async () => {
//     const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
  
//     if (!userId) {
//       toast.error('Please signup first to create the project');
//       return;
//     }
  
//     // const projectData = {
//     //   name: projectName,
//     //   status: status,
//     //   hourlyRate: hourlyRate,
//     //   budget: budget,
//     //   team: rows.map(row => ({
//     //     jobRole: row.jobRole,
//     //     empname: row.empname,
//     //     empid: row.empid
//     //   })),
//     //   createdBy: userId
//     // };

//     const projectData = {
//       name: projectName,
//       status: status,
//       hourlyRate: hourlyRate,
//       budget: budget,
//       team: rows.map(row => {
//         console.log(row,"rowrow")
//         const selectedMember = availableMembers.find(member => member.empid === row.member);
//         return {
//           jobRole: row.jobRole,
//       empname: row.empname,
//       empid: selectedMember ? selectedMember._id : undefined 
//         };
//       }).filter(row => row.empid !== undefined), 
//       createdBy: userId
//     };

//     try {
//       let response;
//       if (isEditing && projectData.id) {
//         response = await axios.put(`http://localhost:5050/api/projects/${projectData.id}`, projectData);
//         toast.success('Project updated successfully!');
//       } else {
//         response = await axios.post('http://localhost:5050/api/projects', projectData);
//         toast.success('Project created successfully!');
//       }
//       onProjectCreated();
//       console.log('Project created/updated successfully!', response);
//     } catch (error) {
//       console.error('Error creating/updating project:', error);
//       toast.error('Failed to create/update project. Please try again.');
//     }
//   };

//   return (
//     <div className='createproject'>
//       <ToastContainer />
//       <TextField
//         className="name"
//         id="outlined-basic"
//         label="Project Name"
//         variant="outlined"
//         value={projectName || selectedProject?.name}
//         onChange={(e) => setProjectName(e.target.value)}
//       />
//       <FormControl className='status'>
//         <InputLabel>Status</InputLabel>
//         <Select
//           label='Status'
//           value={status ? status : selectedProject?.status ? selectedProject?.status : ""}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <MenuItem value="Active">Active</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//           <MenuItem value="Deactive">Deactivate</MenuItem>
//         </Select>
//       </FormControl>
//       <TextField
//         className="hourlyRate"
//         id="outlined-basic"
//         label="Hourly Rate"
//         variant="outlined"
//         value={hourlyRate ? hourlyRate : selectedProject?.hourlyRate ? selectedProject?.hourlyRate : ""}
//         type="number"
//         onChange={(e) => setHourlyRate(e.target.value)}
//       />
//       <TextField
//         className="budget"
//         id="outlined-basic"
//         label="Budget"
//         variant="outlined"
//         type="number"
//         value={budget ? budget : selectedProject?.budget ? selectedProject?.budget : ""}
//         onChange={(e) => setBudget(e.target.value)}
//       />
//       <hr />
//       <InputLabel className="projectteam text-black">Project Team</InputLabel>
//       {rows.map((item) => (
//         <div key={item.id}>
//           <FormControl sx={{ m: 1, ml: 4, mt: 2, minWidth: 186 }}>
//             <InputLabel>Job role</InputLabel>
//             <Select
//               label='Job Role'
//               value={item.jobRole ? item.jobRole : selectedProject?.team[0]?.jobRole ? selectedProject?.team[0]?.jobRole : ""}
//               onChange={(e) => {
//                 handleChange(item.id, 'jobRole', e.target.value);
//               }}
//             > 
//               {jobRoles.map((role) => (
//                 <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 216 }}>
//             <Autocomplete
//               options={availableMembers.map(member => member.empname)}
//               renderInput={(params) => (
//                 <TextField {...params} label="Emp Name" variant="outlined" />
//               )}
//               value={item.empname ? item.empname : selectedProject?.team[0]?.empname ? selectedProject?.team[0]?.empname : ""}
//               onChange={(e, newValue) => handleChange(item.id, 'empname', newValue)}
//             />
//           </FormControl>
//           <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 156 }}>
//             <Autocomplete
//               options={availableMembers.map(member => member.empid)}
//               renderInput={(params) => (
//                 <TextField {...params} label="Emp ID" variant="outlined" />
//               )}
//               value={item.empid ? item.empid : selectedProject?.team[0]?.empid ? selectedProject?.team[0]?.empid : ""}
//               onChange={(e, newValue) => handleChange(item.id, 'empid', newValue)}
//             />
//           </FormControl>
//           {item.id !== 1 && <DeleteIcon className='deleteicon' onClick={() => handleDeleteRow(item.id)} />}
//         </div>
//       ))}
//       <Link className='addnewemp text-black text-decoration-none' onClick={handleAddRow}>+ Add new Employee</Link>
//       <hr />
//       <Button className="createproject-btn float-end" variant="contained" onClick={handleCreateProject}>
//         {isEditing ? 'Update' : 'Create'}
//       </Button>
//     </div>
//   );
// }


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

router.post('/projects', async (req, res) => {
  try {
    const { name, status, hourlyRate, budget, jobRole, empname, empid, createdBy } = req.body;
    const newProject = new Project({
      name,
      status,
      hourlyRate,
      budget,
      jobRole,
      empname,
      empid,
      createdBy
    });

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
    

    // console.log(formattedProjects, 'formattedProjectsformattedProjects')

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


import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import './Createproject.css';
import { Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateProject({ onProjectCreated, isEditing, projectData, selectedProject }) {
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [budget, setBudget] = useState('');
  const [rows, setRows] = useState([{ id: 1, jobRole: '', empname: '', empid: '' }]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await axios.get('http://localhost:5050/api/empname');
        const jobRolesResponse = await axios.get('http://localhost:5050/api/jobrole');
        
        setAvailableMembers(membersResponse.data);
        setJobRoles(jobRolesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (projectData) {
      setProjectName(projectData.ProjectName || '');
      setStatus(projectData.status || '');
      setHourlyRate(projectData.hourlyRate || '');
      setBudget(projectData.budget || '');
      setRows(projectData ? projectData.map((member, index) => ({

        id: index + 1,
        jobRole: member.jobRole || '',
        empname: member.empname || '',
        empid: member.empid || ''
      })) : [{ id: 1, jobRole: '', empname: '', empid: '' }]);
    }
  }, [projectData]);
  console.log(projectData,'projectDataprojectDataprojectData')

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, jobRole: '', empname: '', empid: '' };
    setRows([...rows, newRow]);
    
  };

  const handleDeleteRow = (idToDelete) => {
    const updatedRows = rows.filter((row) => row.id !== idToDelete);
    setRows(updatedRows);
  };

  const handleChange = (id, field, value) => {
    if (field === 'empname') {
      const selectedMember = availableMembers.find(member => member.empname === value);
      value = selectedMember ? selectedMember._id : '';
    }
    if (field === 'empid') {
      const selectedMember = availableMembers.find(member => member.empid === value);
      value = selectedMember ? selectedMember._id : '';
    }

    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    
    setRows(updatedRows);
  };

  const handleCreateProject = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
  
    if (!userId) {
      toast.error('Please signup first to create the project');
      return;
    }
    const projectData = {
      name: projectName,
      status: status,
      hourlyRate: hourlyRate,
      budget: budget,
      project_team: rows.map(row => {
        const selectedMember = availableMembers.find(member => member.empid === row.empid);
        return {
          jobRole: row.jobRole,
          empname: row.empname,
          empid: row.empid
        };
      }).filter(row => row.empid !== undefined),
      createdBy: userId
    };
  
    console.log('Project Data to send:', projectData); // Log the project data
  
    try {
      let response;
      if (isEditing && projectData.id) {
        response = await axios.put(`http://localhost:5050/api/projects/${projectData.id}`, projectData);
        toast.success('Project updated successfully!');
      } else {
        response = await axios.post('http://localhost:5050/api/projects', projectData);
        toast.success('Project created successfully!');
      }
      onProjectCreated();
      console.log('Project created/updated successfully!', response);
    } catch (error) {
      console.error('Error creating/updating project:', error);
      toast.error('Failed to create/update project. Please try again.');
    }
  };
  

  return (
    <div className='createproject'>
      <ToastContainer />
      <TextField
        className="name"
        id="outlined-basic"
        label="Project Name"
        variant="outlined"
        value={projectName || selectedProject?.name}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <FormControl className='status'>
        <InputLabel>Status</InputLabel>
        <Select
          label='Status'
          value={status ? status : selectedProject?.status ? selectedProject?.status : ""}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Deactive">Deactivate</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className="hourlyRate"
        id="outlined-basic"
        label="Hourly Rate"
        variant="outlined"
        value={hourlyRate ? hourlyRate : selectedProject?.hourlyRate ? selectedProject?.hourlyRate : ""}
        type="number"
        onChange={(e) => setHourlyRate(e.target.value)}
      />
      <TextField
        className="budget"
        id="outlined-basic"
        label="Budget"
        variant="outlined"
        type="number"
        value={budget ? budget : selectedProject?.budget ? selectedProject?.budget : ""}
        onChange={(e) => setBudget(e.target.value)}
      />
      <hr />
      <InputLabel className="projectteam text-black">Project Team</InputLabel>
      {rows.map((item) => (
        <div key={item.id}>
          <FormControl sx={{ m: 1, ml: 4, mt: 2, minWidth: 186 }}>
            <InputLabel>Job role</InputLabel>
            <Select
              label='Job Role'
              value={item.jobRole ? item.jobRole : selectedProject?.team[0]?.jobRole ? selectedProject?.project_team[0]?.jobRole : ""}
              onChange={(e) => {
                handleChange(item.id, 'jobRole', e.target.value);
              }}
            > 
              {jobRoles.map((role) => (
                <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 216 }}>
            <Autocomplete
              options={availableMembers.map(member => member.empname)}
              renderInput={(params) => (
                <TextField {...params} label="Emp Name" variant="outlined" />
              )}
              value={item.empname ? item.empname : selectedProject?.team[0]?.empname ? selectedProject?.team[0]?.empname : ""}
              onChange={(e, newValue) => handleChange(item.id, 'empname', newValue)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 156 }}>
            <Autocomplete
              options={availableMembers.map(member => member.empid)}
              renderInput={(params) => (
                <TextField {...params} label="Emp ID" variant="outlined" />
              )}
              value={item.empid ? item.empid : selectedProject?.team[0]?.empid ? selectedProject?.team[0]?.empid : ""}
              onChange={(e, newValue) => handleChange(item.id, 'empid', newValue)}
            />
          </FormControl>
          {item.id !== 1 && <DeleteIcon className='deleteicon' onClick={() => handleDeleteRow(item.id)} />}
        </div>
      ))}
      <Link className='addnewemp text-black text-decoration-none' onClick={handleAddRow}>+ Add new Employee</Link>
      <hr />
      <Button className="createproject-btn float-end" variant="contained" onClick={handleCreateProject}>
        {isEditing ? 'Update' : 'Create'}
      </Button>
    </div>
  );
}
