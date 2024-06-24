import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Textarea from '@mui/joy/Textarea';
import dayjs from 'dayjs';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DevAddReport({ onReportAdded, currentReport }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [projectNames, setProjectNames] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [logHours, setLogHours] = useState('');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const developerId = localStorage.getItem('userId');
        if (!developerId) {
          console.error('Developer ID not found.');
          return;
        }

        // Fetch projects
        const projectsResponse = await axios.get(`ems-api.antiers.world/api/developer/${developerId}`);
        setProjectNames(projectsResponse.data.map(project => ({ label: project.name, id: project._id })));

        // Set initial values if editing existing report
        if (currentReport) {
          setSelectedProject({
            label: currentReport.projectName,
            id: currentReport.projectName._id
          });
          setSelectedDate(dayjs(currentReport.date));
          setLogHours(currentReport.logHours || '');
          setRemarks(currentReport.remarks || '');
        } else {
          // Set default values for new report
          setSelectedProject(null);
          setSelectedDate(dayjs());
          setLogHours('');
          setRemarks('');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentReport]);

  const handleAddReport = async () => {
    const developerId = localStorage.getItem('userId');
    const jobRole = localStorage.getItem('jobRole');

    const reportData = {
      projectName: selectedProject.id,
      employeeId: developerId,
      employeeName: developerId,
      jobRole: jobRole,
      date: selectedDate.format('YYYY-MM-DD'),
      logHours,
      remarks,
    };

    try {
      if (currentReport) {
        // Update existing report
        await axios.put(`ems-api.antiers.world/api/reports/${currentReport._id}`, reportData);
        toast.success('Report updated successfully');
      } else {
        // Add new report
        await axios.post('ems-api.antiers.world/api/addreport', reportData);
        toast.success('Report added successfully');
      }
      if (onReportAdded) onReportAdded();
    } catch (error) {
      console.error('Error adding/updating report:', error);
      toast.error('Error adding/updating report');
    }
  };

  const handleLogHoursChange = (event) => {
    const inputValue = event.target.value;
    setLogHours(inputValue);
    const regex = /^([01]?[0-9]|2[0-3])\.[0-5][0-9]$/; // Regex for hh.mm format
    setError(!regex.test(inputValue));
  };

  return (
    <div className='addreport'>
      <ToastContainer />
      <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 435 }}>
        <Autocomplete
          options={projectNames}
          value={selectedProject}
          onChange={(event, value) => setSelectedProject(value)}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Project Name" variant="outlined" disabled={currentReport ? true : false} />
          )}
        />
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 435 }}>
          <TextField
            label="Log Hours"
            variant="outlined"
            placeholder="hh.mm"
            value={logHours}
            onChange={handleLogHoursChange}
            error={error}
            helperText={error ? 'Invalid time format. Use hh.mm' : ''}
            fullWidth
          />
        </FormControl>
      </LocalizationProvider>

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
        {currentReport ? 'Update' : 'Add'} Report
      </Button>

    </div>
  );
}
