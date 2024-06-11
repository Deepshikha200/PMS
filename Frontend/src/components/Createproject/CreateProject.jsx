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

export default function CreateProject({ onProjectCreated, isEditing, projectData,selectedProject }) {
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [budget, setBudget] = useState('');
  const [rows, setRows] = useState([{ id: 1, jobRole: '', team: '', member: '' }]);
  const [availableTeams, setAvailableTeams] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [teamId,setTeamId] = useState("")
  console.log(selectedProject?.team[0]?.jobRole,"selectedProject")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsResponse = await axios.get('http://localhost:5050/api/teams');
        const membersResponse = await axios.get('http://localhost:5050/api/email');
        const jobRolesResponse = await axios.get('http://localhost:5050/api/jobrole');
        
        setAvailableTeams(teamsResponse.data);
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
      setRows(projectData.team ? projectData.team.map((member, index) => ({
        id: index + 1,
        jobRole: member.jobRole || '',
        team: member.team || '',
        member: member.member || ''
      })) : [{ id: 1, jobRole: '', team: '', member: '' }]);
    }
  }, [projectData]);

  const handleSelectMembers = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5050/api/members/${id}`);
      setAvailableMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
  
  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, jobRole: '', team: '', member: '' };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (idToDelete) => {
    const updatedRows = rows.filter((row) => row.id !== idToDelete);
    setRows(updatedRows);
  };

  const handleChange = (id, field, value) => {
    if (field === 'members') {
      const selectedMember = availableMembers.find(member => member.email === value);
      value = selectedMember.name ? selectedMember._id : ''; 
    }
    if (field === 'team') {
      console.log(availableTeams[0].name,';;;;;;;;;;;;;',value)
      const selectedTeam = availableTeams.find(team => team.name === value);
      console.log(typeof selectedTeam,"selectedTeam", selectedProject)
      value = selectedTeam ? selectedTeam.name : ''; 
      setTeamId(selectedTeam?._id )

    }
    // Ensure that member field is set to a valid ObjectId
    if (field === 'member' && value === '') {
      // If value is empty, set it to null to avoid cast error
      value = null;
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
      team: rows.map(row => {
        console.log(row,"rowrow")
        const selectedMember = availableMembers.find(member => member.email === row.member);
        return {
          jobRole: row.jobRole,
          team: teamId?teamId:null,
          member: selectedMember ? selectedMember._id : undefined 
        };
      }).filter(row => row.member !== undefined), 
      createdBy: userId
    };
    
  
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
        value={projectName||selectedProject?.name}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <FormControl className='status'>
        <InputLabel>Status</InputLabel>
        <Select
          label='Status'
          value={status?status:selectedProject?.status?selectedProject?.status:""}
          onChange={(e) => setStatus(e.target.value)}
        >
         
          <MenuItem value="Active">To Do</MenuItem>
          <MenuItem value="Completed">In Progress</MenuItem>
          <MenuItem value="Completed">Done</MenuItem>
          <MenuItem value="Deactive">Deactivate</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className="hourlyRate"
        id="outlined-basic"
        label="Hourly Rate"
        variant="outlined"
        value={hourlyRate?hourlyRate:selectedProject?.hourlyRate?selectedProject?.hourlyRate:""}

        type="number"
        onChange={(e) => setHourlyRate(e.target.value)}
      />
      <TextField
        className="budget"
        id="outlined-basic"
        label="Budget"
        variant="outlined"
        type="number"
        value={budget?budget:selectedProject?.budget?selectedProject?.budget:""}

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
              value={item.jobRole?item?.jobRole:selectedProject?.team[0]?.jobRole?selectedProject?.team[0]?.jobRole:""}

              onChange={(e) => {
                handleChange(item.id, 'jobRole', e.target.value);
                handleSelectMembers(e.target.value); 
              }}
            >
              {jobRoles.map((role) => (
                <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 156 }}>
            <Autocomplete
              options={availableTeams.map(team => team.name)}
              renderInput={(params) => (
                <TextField {...params} label="Teams" variant="outlined" />
              )}
              value={item?.team?item?.team:selectedProject?.team[0]?.team?selectedProject?.team[0]?.team:""}

              onChange={(e, newValue) => handleChange(item.id, 'team', newValue)}
            />
          </FormControl> */}
          <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 216 }}>
            <Autocomplete
              options={availableMembers.map(member => member.email)}
              renderInput={(params) => (
                <TextField {...params} label="Emp Name" variant="outlined" />
              )}
              value={item.member?item?.member:selectedProject?.team[0]?.member?selectedProject?.team[0]?.member:""}

              onChange={(e, newValue) => handleChange(item.id, 'member', newValue)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 156 }}>
            <Autocomplete
              options={availableMembers.map(member => member.email)}
              renderInput={(params) => (
                <TextField {...params} label="Emp ID" variant="outlined" />
              )}
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
