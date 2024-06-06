
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Autocomplete } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Textarea from '@mui/joy/Textarea';
import dayjs from 'dayjs';
import './AddReport.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddReport({ onReportAdded }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [jobRoles, setJobRoles] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedJobRole, setSelectedJobRole] = useState('');
  const [shiftStart, setShiftStart] = useState('');
  const [shiftEnd, setShiftEnd] = useState('');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobRolesResponse = await axios.get('http://localhost:5050/api/jobrole');
        setJobRoles(jobRolesResponse.data);
        
        const projectsResponse = await axios.get('http://localhost:5050/api/projects');
        setProjectNames(projectsResponse.data.map(project => ({ label: project.name, id: project._id })));

        const employeesResponse = await axios.get('http://localhost:5050/api/employees');
        const employeeOptions = employeesResponse.data.map(employee => ({ label: `${employee.firstName} ${employee.lastName}`, id: employee._id }));
        setEmployeeNames(employeeOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, []);

  const handleAddReport = async () => {
    if (!selectedProject || !selectedEmployee || !selectedJobRole || !shiftStart || !shiftEnd) {
      toast.error('Please fill in all required fields');
      return;
    }

    const reportData = {
      projectName: selectedProject.id,
      employeeName: selectedEmployee.id,
      jobRole: selectedJobRole,
      date: selectedDate.format('YYYY-MM-DD'), // Ensure the date format is consistent
      shiftStart,
      shiftEnd,
      remarks,
    };

    try {
      await axios.post('http://localhost:5050/api/addreport', reportData);
      toast.success('Report added successfully');
      if (onReportAdded) onReportAdded();
    } catch (error) {
      console.error('Error adding report:', error);
      toast.error('Error adding report');
    }
  };

  return (
    <div className='addreport'>
      <ToastContainer />
      <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 435 }}>
        <Autocomplete
          options={projectNames}
          getOptionLabel={(option) => option.label}
          onChange={(event, value) => setSelectedProject(value)}
          renderInput={(params) => (
            <TextField {...params} label="Project Name" variant="outlined" />
          )}
        />
      </FormControl>
      <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 200 }}>
        <Autocomplete
          options={employeeNames}
          getOptionLabel={(option) => option.label}
          onChange={(event, value) => setSelectedEmployee(value)}
          renderInput={(params) => (
            <TextField {...params} label="Employee Name" variant="outlined" />
          )}
        />
      </FormControl>
      
      <FormControl sx={{ m: 1, ml: 3, mt: 2, minWidth: 200 }}>
        <InputLabel id="job-role-label">Job Role</InputLabel>
        <Select
          labelId="job-role-label"
          id="job-role-select"
          value={selectedJobRole}
          onChange={(e) => setSelectedJobRole(e.target.value)}
          label="Job Role"
        >
          {jobRoles.map((role) => (
            <MenuItem key={role._id} value={role.name}>{role.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 435 }}>
        <DesktopDatePicker
          label="Date"
          inputFormat="MM/DD/YYYY"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          renderInput={(params) => <TextField {...params} className='reportdate' />}
        />
        </FormControl>
      </LocalizationProvider>
      
      <TextField
        className='shiftstart'
        label="Shift Start"
        variant="outlined"
        value={shiftStart}
        onChange={(e) => setShiftStart(e.target.value)}
      />
      <TextField
        className='shiftend'
        label="Shift End"
        variant="outlined"
        value={shiftEnd}
        onChange={(e) => setShiftEnd(e.target.value)}
      />
      
      <Textarea
        className="remarks"
        placeholder="Remarks"
        minRows={3}
        maxRows={6}
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      <Button
        className="addbtn float-end me-5 mt-3 mb-3"
        variant="contained"
        onClick={handleAddReport}
      >
        Add
      </Button>
    </div>
  );
}
