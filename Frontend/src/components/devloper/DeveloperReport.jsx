import React, { useState, useEffect } from 'react';
import './Developerreport.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeveloperAddReport from './developer_addreport/DeveloperAddReport.jsx';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  export default function DeveloperReport() {
  const [showReport, setShowReport] = useState(false);
  const [showLogHoursModal, setShowLogHoursModal] = useState(false); // State to control log hours modal visibility
  const [rows, setRows] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(''); // State to hold the selected project
  const [projectNames, setProjectNames] = useState([]);
  const [totalLogHours, setTotalLogHours] = useState(0); // State to hold total log hours for selected project

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage.');
        return;
      }
      const response = await axios.get(`http://localhost:5050/api/reports/${userId}`);
      const formattedData = formatData(response.data);
      setRows(formattedData);

      // Extract unique project names
      const uniqueProjectNames = Array.from(new Set(formattedData.map((row) => row.projectName)));
      setProjectNames(uniqueProjectNames);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatData = (data) => {
    return data.map((report, index) => ({
      srno: index + 1,
      ...report,
      projectName: report.projectName?.name || 'N/A',
      date: new Date(report.date).toLocaleDateString(),
      loghours: report.logHours || 'N/A',
    }));
  };

  const handleCloseReport = () => {
    setShowReport(false);
    setCurrentReport(null); // Reset the current report
    fetchData(); // Refresh the data after closing the modal
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handleEditClick = (report) => {
    setCurrentReport(report);
    setShowReport(true);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value); // Update selected project
  };

  const handleLogHoursClick = () => {
    // Calculate total log hours for selected project
    const filteredRows = rows.filter(row =>
      (!selectedProject || row.projectName === selectedProject)
    );
    const totalHours = filteredRows.reduce((total, row) => total + parseFloat(row.loghours), 0);
    setTotalLogHours(totalHours);
    // Show log hours modal
    setShowLogHoursModal(true);
  };

  const handleLogHoursModalClose = () => {
    setShowLogHoursModal(false);
    setSelectedProject('');
  };

  const filteredRows = rows.filter(row =>
    (!selectedProject || row.projectName === selectedProject)
  );

  const columns = [
    { field: 'srno', headerName: 'Sr No.', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'projectName', headerName: 'Project Name', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'date', headerName: 'Date', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'loghours', headerName: 'Log Hours', width: 170, headerAlign: 'center', align: 'center' },
    { field: 'remarks', headerName: 'Remarks', width: 400, headerAlign: 'center', align: 'center' },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className='report'>
        <h2 className='mt-5 mb-3 text-center fs-1 fw-bold'>Daily Report</h2>
        <Button className="float-end" sx={{ mr: 5, height: 50, mt: -6 }} variant="contained" onClick={handleShowReport}>Add Report</Button>
        <Button
          className="float-end"
          sx={{ mr: 2, height: 50, mt: -6 }}
          onClick={handleClick}
          aria-controls={anchorEl ? 'filter-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          variant="contained"
        >
          Filter <FilterListIcon />
        </Button>

        <Button
          className="float-end"
          sx={{ mr: 2, height: 50, mt: -6 }}
          variant="contained"
          onClick={handleLogHoursClick}
        >
          Show Log Hours
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ mt: 2 }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>Project Name</InputLabel>
              <Select
                label="Project Name"
                value={selectedProject}
                onChange={handleProjectChange}
              >
                <MenuItem value="">All</MenuItem>
                {projectNames.map((projectName) => (
                  <MenuItem key={projectName} value={projectName}>
                    {projectName}
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
          <Modal.Title>{currentReport ? 'Edit Report' : 'Add Report'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeveloperAddReport
            onReportAdded={handleCloseReport}
            currentReport={currentReport} // Pass currentReport to DeveloperAddReport
          />
        </Modal.Body>
      </Modal>

      {/* Modal to display total log hours */}
      <Modal show={showLogHoursModal} onHide={handleLogHoursModalClose}>
        <Modal.Header closeButton>
          <Modal.Title><h4>Total Log Hours</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='totalLogHours'>Total log hours for {selectedProject}: {totalLogHours} Hours</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={handleLogHoursModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
