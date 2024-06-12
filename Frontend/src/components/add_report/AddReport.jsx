// import React, { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import FormControl from '@mui/material/FormControl';
// import { Autocomplete } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import Textarea from '@mui/joy/Textarea';
// import dayjs from 'dayjs';
// import './AddReport.css';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function AddReport({ onReportAdded }) {
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [projectNames, setProjectNames] = useState([]);
//   const [employeeId, setEmployeeId] = useState([]);
//   const [selectedProject, setSelectedProject] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedJobRole, setSelectedJobRole] = useState('');
//   const [remarks, setRemarks] = useState('');
//   const [logHours, setLogHours] = useState('');
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const projectsResponse = await axios.get('http://localhost:5050/api/projects');
//         setProjectNames(projectsResponse.data.map(project => ({ label: project.name, id: project._id })));

//         const employeesResponse = await axios.get('http://localhost:5050/api/employees');
//         const employeeOptions = employeesResponse.data.map(employee => ({ label: `${employee.empid}`, id: employee._id }));
//         setEmployeeId(employeeOptions);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (event) => {
//     const inputValue = event.target.value;
//     setLogHours(inputValue);

//     const regex = /^([01]?[0-9]|2[0-3])\.[0-5][0-9]$/; // Regex for hh.mm format
//     if (regex.test(inputValue)) {
//       setError(false);
//     } else {
//       setError(true);
//     }
//   };

//   const handleAddReport = async () => {
//     if (!selectedProject || !selectedEmployee || !selectedJobRole || !selectedDate || !logHours || error) {
//       toast.error('Please fill in all required fields with valid data.');
//       return;
//     }

//     const reportData = {
//       projectName: selectedProject.id,
//       employeeName: selectedEmployee.id,
//       jobRole: selectedJobRole,
//       date: selectedDate.format('YYYY-MM-DD'),
//       logHours,
//       remarks,
//     };

//     try {
//       await axios.post('http://localhost:5050/api/addreport', reportData);
//       toast.success('Report added successfully!');
//       if (onReportAdded) {
//         onReportAdded();
//       }
//     } catch (error) {
//       console.error('Error adding report:', error);
//       toast.error('Failed to add report.');
//     }
//   };

//   return (
//     <div className='addreport'>
//       <ToastContainer />
//       <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 435 }}>
//         <Autocomplete
//           options={projectNames}
//           getOptionLabel={(option) => option.label}
//           onChange={(event, value) => setSelectedProject(value)}
//           renderInput={(params) => (
//             <TextField {...params} label="Project Name" variant="outlined" />
//           )}
//         />
//       </FormControl>


//       <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 200 }}>
//         <Autocomplete
//           disablePortal
//           id="combo-box-demo"
//           options={employeeId}
//           renderInput={(params) => <TextField {...params} label="Emp ID" />}
//         />
//       </FormControl>
//       <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 200 }}>
//         <Autocomplete
//           options={[]}
//           getOptionLabel={(option) => option.label}
//           onChange={(event, value) => setSelectedEmployee(value)}
//           renderInput={(params) => (
//             <TextField {...params} label="Employee Name" variant="outlined" />
//           )}
//         />
//       </FormControl>
//       <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 200 }}>
//         <InputLabel id="job-role-label">Job Role</InputLabel>
//         <Select
//           labelId="job-role-label"
//           id="job-role-select"
//           value={selectedJobRole}
//           onChange={(e) => setSelectedJobRole(e.target.value)}
//           label="Job Role"
//         >

//         </Select>
//       </FormControl>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <FormControl sx={{ m: 1, ml: 2, mt: 2, width: 200 }}>
//           <DesktopDatePicker
//             label="Date"
//             inputFormat="MM/DD/YYYY"
//             value={selectedDate}
//             onChange={(newDate) => setSelectedDate(newDate)}
//             renderInput={(params) => <TextField {...params} className='reportdate' />}
//           />
//         </FormControl>
//       </LocalizationProvider>

//       <FormControl sx={{ m: 1, ml: 2, mt: 2, mb: 2, minWidth: 435 }}>
//         <TextField
//           label="Log Hours"
//           variant="outlined"
//           placeholder="hh.mm"
//           value={logHours}
//           onChange={handleChange}
//           error={error}
//           helperText={error ? 'Invalid time format. Use hh.mm' : ''}
//           fullWidth
//         />
//       </FormControl>

//       <Textarea
//         className="remarks"
//         placeholder="Remarks"
//         minRows={3}
//         maxRows={6}
//         value={remarks}
//         onChange={(e) => setRemarks(e.target.value)}
//       />

//       <Button
//         className="addbtn float-end me-5 mt-3 mb-3"
//         variant="contained"
//         onClick={handleAddReport}
//       >
//         Add
//       </Button>
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
  const [projectNames, setProjectNames] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedEmployeeName, setSelectedEmployeeName] = useState('');
  const [selectedEmployeeJobRole, setSelectedEmployeeJobRole] = useState('');
  const [remarks, setRemarks] = useState('');
  const [logHours, setLogHours] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await axios.get('http://localhost:5050/api/projects');
        setProjectNames(projectsResponse.data.map(project => ({ label: project.name, id: project._id })));

        const employeesResponse = await axios.get('http://localhost:5050/api/employees');
        const employeeOptions = employeesResponse.data.map(employee => ({ label: `${employee.empid}`, id: employee.empid }));
        setEmployeeId(employeeOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 
  const handleEmployeeIdChange = async (event, value) => {
    if (!value) return;

    try {
        const employeeId = value.id; // Extracting the id from the value object
        console.log(employeeId, "employeeId"); // Logging the employeeId to the console

        const response = await axios.get(`http://localhost:5050/api/employeeById/${employeeId}`);
        const { name, jobRole } = response.data;
        setSelectedEmployeeName(name);
        setSelectedEmployeeJobRole(jobRole);
    } catch (error) {
        console.error('Error fetching employee details:', error);
        toast.error('Failed to fetch employee details.');
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
      await axios.post('http://localhost:5050/api/addreport', reportData);
      toast.success('Report added successfully!');
      if (onReportAdded) {
        onReportAdded();
      }
    } catch (error) {
      console.error('Error adding report:', error);
      toast.error('Failed to add report.');
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
          disablePortal
          id="combo-box-demo"
          options={employeeId}
          onChange={handleEmployeeIdChange}
          renderInput={(params) => <TextField {...params} label="Emp ID" />}
        />
      </FormControl>

      <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 200 }}>
        <TextField
          label="Employee Name"
          variant="outlined"
          value={selectedEmployeeName}
          disabled
        />
      </FormControl>

      <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 200 }}>
        <InputLabel id="job-role-label">Job Role</InputLabel>
        <Select
          labelId="job-role-label"
          id="job-role-select"
          value={selectedEmployeeJobRole}
          onChange={(e) => setSelectedEmployeeJobRole(e.target.value)}
          label="Job Role"
        >

        </Select>
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
