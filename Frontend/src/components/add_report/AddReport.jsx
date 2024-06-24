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
  const [selectedProject, setSelectedProject] = useState(null); // Changed to null
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // Changed to null
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
        const projectsResponse = await axios.get(`ems-api.antiers.world/api/user/${userId}`);

        setProjectNames(projectsResponse.data.map(project => ({ label: project.name, id: project._id })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();

    if (currentReport) {
      setSelectedDate(dayjs(currentReport.date));
      setSelectedProject({ label: currentReport.projectName, id: currentReport.projectName._id });
      setSelectedEmployeeId({ label: currentReport.employeeId, id: currentReport.employeeId });
      setSelectedEmployeeName(currentReport.employeeName);
      setSelectedEmployeeJobRole(currentReport.jobRole);
      setLogHours(currentReport.logHours || ''); 
      setRemarks(currentReport.remarks || '');
    }
  }, [currentReport]);

  const handleProjectChange = async (event, value) => {
    if (!value) return;

    try {
      setSelectedProject(value);

      const response = await axios.get(`ems-api.antiers.world/api/project/members/${value.id}`);
      const employeeOptions = response.data.team.map(member => ({ label: `${member.empid.empid}`, id: member.empid._id }));
      setEmployeeId(employeeOptions);
    } catch (error) {
      console.error('Error fetching project members:', error);
    }
  };

  const handleEmployeeIdChange = async (event, value) => {
    if (!value) return;

    try {
      setSelectedEmployeeId(value.id);

      const response = await axios.get(`ems-api.antiers.world/api/employeeById/${value.id}`);
      const { name, jobRole } = response.data;
      setSelectedEmployeeName(name);
      setSelectedEmployeeJobRole(jobRole);
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

    const reportData = {
      projectName: selectedProject.id,
      employeeId: selectedEmployeeId,
      employeeName: selectedEmployeeName,
      jobRole: selectedEmployeeJobRole,
      date: selectedDate.format('YYYY-MM-DD'),
      logHours,
      remarks,
    };
   
    try {
      if (currentReport) {
        await axios.put(`ems-api.antiers.world/api/reports/${currentReport._id}`, reportData);
        toast.success('Report updated successfully!');
      } else {
        await axios.post('ems-api.antiers.world/api/addreport', reportData);
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
          disablePortal
          id="combo-box-demo"
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
            renderInput={(params) => <TextField {...params} className='reportdate' />}
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
