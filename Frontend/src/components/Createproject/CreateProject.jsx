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

// export default function CreateProject() {
//   const [projectName, setProjectName] = useState('');
//   const [status, setStatus] = useState('');
//   const [hourlyRate, setHourlyRate] = useState('');
//   const [budget, setBudget] = useState('');
//   const [rows, setRows] = useState([{ id: 1, jobRole: '', team: '', member: '' }]);
//   const [availableTeams, setAvailableTeams] = useState([]);
//   const [availableMembers, setAvailableMembers] = useState([]);
//   const [jobRoles, setJobRoles] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const teamsResponse = await axios.get('http://localhost:5050/api/teams');
//         const membersResponse = await axios.get('http://localhost:5050/api/email');
//         const jobRolesResponse = await axios.get('http://localhost:5050/api/jobrole');
        
//         setAvailableTeams(teamsResponse.data);
//         setAvailableMembers(membersResponse.data);
//         setJobRoles(jobRolesResponse.data);
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddRow = () => {
//     const newRow = { id: rows.length + 1, jobRole: '', team: '', member: '' };
//     setRows([...rows, newRow]);
//   };

//   const handleDeleteRow = (idToDelete) => {
//     const updatedRows = rows.filter((row) => row.id !== idToDelete);
//     setRows(updatedRows);
//   };

//   const handleChange = (id, field, value) => {
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

//     const projectData = {
//       name: projectName,
//       status: status,
//       hourlyRate: hourlyRate,
//       budget: budget,
//       team: rows.map(row => {
//         const selectedMember = availableMembers.find(member => member.email === row.member);
//         return {
//           jobRole: row.jobRole,
//           team: row.team,
//           member: selectedMember ? selectedMember._id : ''
//         };
//       }),
//       createdBy: userId
//     };

//     try {
//       const response = await axios.post('http://localhost:5050/api/projects', projectData);
//       toast.success('Project created successfully!');
//     } catch (error) {
//       console.error('Error creating project:', error);
//       toast.error('Failed to create project. Please try again.');
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
//         value={projectName}
//         onChange={(e) => setProjectName(e.target.value)}
//       />
//       <FormControl className='status'>
//         <InputLabel>Status</InputLabel>
//         <Select
//           label='Status'
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <MenuItem value="Start">Start</MenuItem>
//           <MenuItem value="Active">Active</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//         </Select>
//       </FormControl>
//       <TextField
//         className='hourlyrate mx-4'
//         label="Hourly rate"
//         variant="outlined"
//         type="number"
//         value={hourlyRate}
//         onChange={(e) => setHourlyRate(e.target.value)}
//       />
//       <TextField
//         className='budget'
//         label="Budget"
//         variant="outlined"
//         type="number"
//         value={budget}
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
//               value={item.jobRole}
//               onChange={(e) => handleChange(item.id, 'jobRole', e.target.value)}
//             >
//               {jobRoles.map((role) => (
//                 <MenuItem key={role._id} value={role.name}>{role.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 186 }}>
//             <Autocomplete
//               options={availableTeams.map(team => team.name)}
//               renderInput={(params) => (
//                 <TextField {...params} label="Teams" variant="outlined" />
//               )}
//               value={item.team}
//               onChange={(e, newValue) => handleChange(item.id, 'team', newValue)}
//             />
//           </FormControl>
//           <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 186 }}>
//             <Autocomplete
//               options={availableMembers.map(member => member.email)}
//               renderInput={(params) => (
//                 <TextField {...params} label="Members" variant="outlined" />
//               )}
//               value={item.member}
//               onChange={(e, newValue) => handleChange(item.id, 'member', newValue)}
//             />
//           </FormControl>
//           {item.id !== 1 && <DeleteIcon className='deleteicon' onClick={() => handleDeleteRow(item.id)} />}
//         </div>
//       ))}
//       <Link className='addnewemp text-black text-decoration-none' onClick={handleAddRow}>+ Add new Employee</Link>
//       <hr />
//       <Button className="createproject-btn float-end" variant="contained" onClick={handleCreateProject}>Create</Button>
//     </div>
//   );
// }


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

// export default function CreateProject({ onProjectCreated }) {
//   const [projectName, setProjectName] = useState('');
//   const [status, setStatus] = useState('');
//   const [hourlyRate, setHourlyRate] = useState('');
//   const [budget, setBudget] = useState('');
//   const [rows, setRows] = useState([{ id: 1, jobRole: '', team: '', member: '' }]);
//   const [availableTeams, setAvailableTeams] = useState([]);
//   const [availableMembers, setAvailableMembers] = useState([]);
//   const [jobRoles, setJobRoles] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const teamsResponse = await axios.get('http://localhost:5050/api/teams');
//         const membersResponse = await axios.get('http://localhost:5050/api/email');
//         const jobRolesResponse = await axios.get('http://localhost:5050/api/jobrole');
        
//         setAvailableTeams(teamsResponse.data);
//         setAvailableMembers(membersResponse.data);
//         setJobRoles(jobRolesResponse.data);
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddRow = () => {
//     const newRow = { id: rows.length + 1, jobRole: '', team: '', member: '' };
//     setRows([...rows, newRow]);
//   };

//   const handleDeleteRow = (idToDelete) => {
//     const updatedRows = rows.filter((row) => row.id !== idToDelete);
//     setRows(updatedRows);
//   };

//   const handleChange = (id, field, value) => {
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
  
//     const projectData = {
//       name: projectName,
//       status: status,
//       hourlyRate: hourlyRate,
//       budget: budget,
//       team: rows.map(row => {
//         const selectedMember = availableMembers.find(member => member.email === row.member);
//         return {
//           jobRole: row.jobRole,
//           team: row.team,
//           member: selectedMember ? selectedMember._id : ''
//         };
//       }),
//       createdBy: userId
//     };
  
//     try {
//       const response = await axios.post('http://localhost:5050/api/projects', projectData);
//       toast.success('Project created successfully!');
  
//       // Call the callback to indicate project creation
//       onProjectCreated();
  
//       // Set timeout to hide the toast after 2 seconds
//       setTimeout(() => {
//         toast.dismiss();
//       }, 2000);
//     } catch (error) {
//       console.error('Error creating project:', error);
//       toast.error('Failed to create project. Please try again.');
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
//         value={projectName}
//         onChange={(e) => setProjectName(e.target.value)}
//       />
//       <FormControl className='status'>
//         <InputLabel>Status</InputLabel>
//         <Select
//           label='Status'
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <MenuItem value="Start">Start</MenuItem>
//           <MenuItem value="Active">Active</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//         </Select>
//       </FormControl>
//       <TextField
//         className="hourlyRate"
//         id="outlined-basic"
//         label="Hourly Rate"
//         variant="outlined"
//         value={hourlyRate}
//         onChange={(e) => setHourlyRate(e.target.value)}
//       />
//       <TextField
//         className="budget"
//         id="outlined-basic"
//         label="Budget"
//         variant="outlined"
//         value={budget}
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
//               value={item.jobRole}
//               onChange={(e) => handleChange(item.id, 'jobRole', e.target.value)}
//             >
//               {jobRoles.map((role) => (
//                 <MenuItem key={role._id} value={role.name}>{role.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 186 }}>
//             <Autocomplete
//               options={availableTeams.map(team => team.name)}
//               renderInput={(params) => (
//                 <TextField {...params} label="Teams" variant="outlined" />
//               )}
//               value={item.team}
//               onChange={(e, newValue) => handleChange(item.id, 'team', newValue)}
//             />
//           </FormControl>
//           <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 186 }}>
//             <Autocomplete
//               options={availableMembers.map(member => member.email)}
//               renderInput={(params) => (
//                 <TextField {...params}
//                 label="Members" variant="outlined" />
//               )}
//               value={item.member}
//               onChange={(e, newValue) => handleChange(item.id, 'member', newValue)}
//             />
//           </FormControl>
//           {item.id !== 1 && <DeleteIcon className='deleteicon' onClick={() => handleDeleteRow(item.id)} />}
//         </div>
//       ))}
//       <Link className='addnewemp text-black text-decoration-none' onClick={handleAddRow}>+ Add new Employee</Link>
//       <hr />
//       <Button className="createproject-btn float-end" variant="contained" onClick={handleCreateProject}>Create</Button>
//     </div>
//   );
// }


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

export default function CreateProject({ onProjectCreated }) {
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [budget, setBudget] = useState('');
  const [rows, setRows] = useState([{ id: 1, jobRole: '', team: '', member: '' }]);
  const [availableTeams, setAvailableTeams] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsResponse = await axios.get('http://localhost:5050/api/teams');
        console.log("Teams:", teamsResponse.data);
        const membersResponse = await axios.get('http://localhost:5050/api/email');
        console.log("Members:", membersResponse.data);
        const jobRolesResponse = await axios.get('http://localhost:5050/api/jobrole');
        console.log("Job Roles:", jobRolesResponse.data);
        
        setAvailableTeams(teamsResponse.data);
        setAvailableMembers(membersResponse.data);
        setJobRoles(jobRolesResponse.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, jobRole: '', team: '', member: '' };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (idToDelete) => {
    const updatedRows = rows.filter((row) => row.id !== idToDelete);
    setRows(updatedRows);
  };

  const handleChange = (id, field, value) => {
    console.log("ID:", id, "Field:", field, "Value:", value);
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
      team: rows.map(row => {
        const selectedMember = availableMembers.find(member => member.email === row.member);
        return {
          jobRole: row.jobRole,
          team: row.team,
          member: selectedMember ? selectedMember._id : ''
        };
      }),
      createdBy: userId
    };
  
    try {
      const response = await axios.post('http://localhost:5050/api/projects', projectData);
      toast.success('Project created successfully!');
      console.log('Project created successfully!', response);
      // Call the callback to indicate project creation
      onProjectCreated();
  
      // Set timeout to hide the toast after 2 seconds
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
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
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <FormControl className='status'>
        <InputLabel>Status</InputLabel>
        <Select
          label='Status'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="Start">Start</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className="hourlyRate"
        id="outlined-basic"
        label="Hourly Rate"
        variant="outlined"
        value={hourlyRate}
        onChange={(e) => setHourlyRate(e.target.value)}
      />
      <TextField
        className="budget"
        id="outlined-basic"
        label="Budget"
        variant="outlined"
        value={budget}
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
              value={item.jobRole}
              onChange={(e) => handleChange(item.id, 'jobRole', e.target.value)}
            >
              {jobRoles.map((role) => (
                <MenuItem key={role._id} value={role.name}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 186 }}>
            <Autocomplete
              options={availableTeams.map(team => team.name)}
              renderInput={(params) => (
                <TextField {...params} label="Teams" variant="outlined" />
              )}
              value={item.team}
              onChange={(e, newValue) => handleChange(item.id, 'team', newValue)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 186 }}>
            <Autocomplete
              options={availableMembers.map(member => member.email)}
              renderInput={(params) => (
                <TextField {...params} label="Members" variant="outlined" />
              )}
              value={item.member}
              onChange={(e, newValue) => handleChange(item.id, 'member', newValue)}
            />
          </FormControl>

          {item.id !== 1 && <DeleteIcon className='deleteicon' onClick={() => handleDeleteRow(item.id)} />}
        </div>
      ))}
      <Link className='addnewemp text-black text-decoration-none' onClick={handleAddRow}>+ Add new Employee</Link>
      <hr />
      <Button className="createproject-btn float-end" variant="contained" onClick={handleCreateProject}>Create</Button>
    </div>
  );
}
