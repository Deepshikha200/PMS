// import React, { useState, useEffect } from 'react';
// import './Report.css';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import Button from '@mui/material/Button';
// import AddReport from '../add_report/AddReport.jsx';
// import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import ListItemText from '@mui/material/ListItemText';
// import FilterListIcon from '@mui/icons-material/FilterList';

// export default function Report() {
//   const [showReport, setShowReport] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [selectedProjects, setSelectedProjects] = useState([]);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5050/api/reports');
//       setRows(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleShowReport = () => {
//     setShowReport(true);
//   };

//   const handleCloseReport = () => {
//     setShowReport(false);
//     fetchData(); // Refresh the data after closing the modal
//   };

//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleProjectChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setSelectedProjects(typeof value === 'string' ? value.split(',') : value);
//   };

//   const handleEmployeeChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setSelectedEmployees(typeof value === 'string' ? value.split(',') : value);
//   };

//   const columns = [
//     { field: 'projectName', headerName: 'Project Name', width: 300, headerAlign: 'center', align: 'center', valueGetter: (params) => params.row.projectName?.name || 'N/A' },
//     { field: 'jobRole', headerName: 'Job Role', width: 150, headerAlign: 'center', align: 'center' },
//     { field: 'employeeName', headerName: 'Employee Name', width: 250, headerAlign: 'center', align: 'center' },
//     { field: 'date', headerName: 'Date', width: 150, headerAlign: 'center', align: 'center', valueGetter: (params) => new Date(params.row.date).toLocaleDateString() },
//     { field: 'logHours', headerName: 'Log Hours', width: 150, headerAlign: 'center', align: 'center' },
//     { field: 'remarks', headerName: 'Remarks', width: 300, headerAlign: 'center', align: 'center' },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => (
//         <div>
//           <IconButton>
//             <EditIcon />
//           </IconButton>
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       )
//     }
//   ];

//   const filteredRows = rows.filter(row => 
//     (selectedProjects.length === 0 || selectedProjects.includes(row.projectName?.name)) &&
//     (selectedEmployees.length === 0 || selectedEmployees.includes(row.employeeName))
//   );

//   return (
//     <>
//       <div className='report'>
//         <h2 className='mt-5 mb-3 text-center fs-1 fw-bold'>Daily Report</h2>
//         <Button className="float-end" sx={{ mr: 5, height: 50, mt: -6 }} variant="contained" onClick={handleShowReport}>Add Report</Button>
//         <Button className="float-end" sx={{ mr: 2, height: 50, mt: -6 }} onClick={handleClick}
//           aria-controls={open ? 'account-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? 'true' : undefined}
//           variant="contained">Filter <FilterListIcon id="filterIcon" /></Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           onClick={handleClose}
//           sx={{ mt: 2 }}
//           transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//           anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//         >
//           <MenuItem>
//             <FormControl sx={{ m: 1, width: 300 }}>
//               <InputLabel>Project Name</InputLabel>
//               <Select
//                 multiple
//                 value={selectedProjects}
//                 onChange={handleProjectChange}
//                 renderValue={(selected) => selected.join(', ')}
//               >
//                 {rows.map((row) => (
//                   <MenuItem key={row.projectName?.name} value={row.projectName?.name}>
//                     <Checkbox checked={selectedProjects.indexOf(row.projectName?.name) > -1} />
//                     <ListItemText primary={row.projectName?.name} />
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </MenuItem>
//           <MenuItem>
//             <FormControl sx={{ m: 1, width: 300 }}>
//               <InputLabel>Employee Name</InputLabel>
//               <Select
//                 multiple
//                 value={selectedEmployees}
//                 onChange={handleEmployeeChange}
//                 renderValue={(selected) => selected.join(', ')}
//               >
//                 {rows.map((row) => (
//                   <MenuItem key={row.employeeName} value={row.employeeName}>
//                     <Checkbox checked={selectedEmployees.indexOf(row.employeeName) > -1} />
//                     <ListItemText primary={row.employeeName} />
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </MenuItem>
//         </Menu>

//         <Box sx={{ height: 650, width: '100%', mt: 3, p: 5 }}>
//           <DataGrid
//             rows={filteredRows}
//             columns={columns}
//             getRowId={(row) => row._id}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 100,
//                 },
//               },
//             }}
//             pageSizeOptions={[100]}
//             disableRowSelectionOnClick
//             sx={{
//               '& .MuiDataGrid-columnHeaders': {
//                 backgroundColor: '#1976D2',
//                 color: 'white',
//               },
//               '& .MuiDataGrid-cell': {
//                 backgroundColor: '#f5f5f5',
//               },
//               '& .MuiDataGrid-row:hover': {
//                 backgroundColor: '#e3f2fd',
//               },
//             }}
//           />
//         </Box>
//       </div>
//       <Modal show={showReport} onHide={handleCloseReport} className="report-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>Report</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <AddReport onReportAdded={handleCloseReport} />
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import './Report.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddReport from '../add_report/AddReport.jsx';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Report() {
  const [showReport, setShowReport] = useState(false);
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/reports');
      const data = response.data.map((report) => ({
        ...report,
        projectName: report.projectName?.name || 'N/A',
        employeeName: report.employeeName?.empname || 'N/A',
        date: new Date(report.date).toLocaleDateString(),
      }));
      setRows(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please check the console for more details.');
    }
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handleCloseReport = () => {
    setShowReport(false);
    fetchData(); // Refresh the data after closing the modal
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProjectChange = (event) => {
    const { target: { value } } = event;
    setSelectedProjects(typeof value === 'string' ? value.split(',') : value);
  };

  const handleEmployeeChange = (event) => {
    const { target: { value } } = event;
    setSelectedEmployees(typeof value === 'string' ? value.split(',') : value);
  };

  const columns = [
    { field: 'projectName', headerName: 'Project Name', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'jobRole', headerName: 'Job Role', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'employeeName', headerName: 'Employee Name', width: 250, headerAlign: 'center', align: 'center' },
    { field: 'date', headerName: 'Date', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'logHours', headerName: 'Log Hours', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'remarks', headerName: 'Remarks', width: 300, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  const filteredRows = rows.filter(row => 
    (selectedProjects.length === 0 || selectedProjects.includes(row.projectName)) &&
    (selectedEmployees.length === 0 || selectedEmployees.includes(row.employeeName))
  );

  return (
    <>
      <div className='report'>
        <h2 className='mt-5 mb-3 text-center fs-1 fw-bold'>Daily Report</h2>
        <Button className="float-end" sx={{ mr: 5, height: 50, mt: -6 }} variant="contained" onClick={handleShowReport}>Add Report</Button>
        <Button className="float-end" sx={{ mr: 2, height: 50, mt: -6 }} onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained">Filter <FilterListIcon id="filterIcon" /></Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{ mt: 2 }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>Project Name</InputLabel>
              <Select
                multiple
                value={selectedProjects}
                onChange={handleProjectChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {rows.map((row) => (
                  <MenuItem key={row.projectName} value={row.projectName}>
                    <Checkbox checked={selectedProjects.indexOf(row.projectName) > -1} />
                    <ListItemText primary={row.projectName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MenuItem>
          <MenuItem>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>Employee Name</InputLabel>
              <Select
                multiple
                value={selectedEmployees}
                onChange={handleEmployeeChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {rows.map((row) => (
                  <MenuItem key={row.employeeName} value={row.employeeName}>
                    <Checkbox checked={selectedEmployees.indexOf(row.employeeName) > -1} />
                    <ListItemText primary={row.employeeName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MenuItem>
        </Menu>

        <Box sx={{ height: 650, width: '100%', mt: 3, p: 5 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100,
                },
              },
            }}
            pageSizeOptions={[100]}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1976D2',
                color: 'white',
              },
              '& .MuiDataGrid-cell': {
                backgroundColor: '#f5f5f5',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#e3f2fd',
              },
            }}
          />
        </Box>
      </div>
      <Modal show={showReport} onHide={handleCloseReport} className="report-modal">
        <Modal.Header closeButton>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddReport onReportAdded={handleCloseReport} />
        </Modal.Body>
      </Modal>
    </>
  );
}
