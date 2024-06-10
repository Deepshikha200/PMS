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
      setProjectName(projectData.name || '');
      setStatus(projectData.status || '');
      setHourlyRate(projectData.hourlyRate || '');
      setBudget(projectData.budget || '');
      setRows(projectData.team ? projectData.team.map((member, index) => ({
        id: index + 1,
        jobRole: member.jobRole || '',
        empname: member.empname || '',
        empid: member.empid || ''
      })) : [{ id: 1, jobRole: '', empname: '', empid: '' }]);
    }
  }, [projectData]);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, jobRole: '', empname: '', empid: '' };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (idToDelete) => {
    const updatedRows = rows.filter((row) => row.id !== idToDelete);
    setRows(updatedRows);
  };

  const handleChange = (id, field, value) => {
    let updatedValue = value;

    if (field === 'empname' || field === 'empid') {
      const selectedMember = availableMembers.find(member => {
        if (field === 'empname') return member.empname === value;
        if (field === 'empid') return member.empid === value;
      });

      updatedValue = selectedMember ? selectedMember._id : '';
    }

    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: updatedValue } : row
    );

    setRows(updatedRows);
  };

  const handleCreateProject = async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      toast.error('Please signup first to create the project');
      return;
    }

    const projectData = {
      name: projectName,
      status: status,
      hourlyRate: hourlyRate,
      budget: budget,
      team: rows.map(row => ({
        jobRole: row.jobRole,
        empname: row.empname,
        empid: row.empid
      })).filter(row => row.empid !== '' && row.empname !== ''),
      createdBy: userId
    };

    console.log('Project data:', projectData);

    try {
      let response;
      if (isEditing && selectedProject?._id) {
        response = await axios.put(`http://localhost:5050/api/projects/${selectedProject._id}`, projectData);
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
          value={status || selectedProject?.status || ""}
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
        value={hourlyRate || selectedProject?.hourlyRate || ""}
        type="number"
        onChange={(e) => setHourlyRate(e.target.value)}
      />
      <TextField
        className="budget"
        id="outlined-basic"
        label="Budget"
        variant="outlined"
        type="number"
        value={budget || selectedProject?.budget || ""}
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
              value={item.jobRole || ""}
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
              value={availableMembers.find(member => member._id === item.empname)?.empname || ""}
              onChange={(e, newValue) => handleChange(item.id, 'empname', newValue)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 156 }}>
            <Autocomplete
              options={availableMembers.map(member => member.empid)}
              renderInput={(params) => (
                <TextField {...params} label="Emp ID" variant="outlined" />
              )}
              value={availableMembers.find(member => member._id === item.empid)?.empid || ""}
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
