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
import FilterListIcon from '@mui/icons-material/FilterList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Report() {
  const [showReport, setShowReport] = useState(false);
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(''); // State to hold the selected project
  const [selectedEmployee, setSelectedEmployee] = useState(''); // State to hold the selected employee
  const [currentReport, setCurrentReport] = useState(null); // State to hold the currently selected report for editing
  const [projectEmployeesMap, setProjectEmployeesMap] = useState({}); // Map to store employees for each project
  const [individualLogHours, setIndividualLogHours] = useState(0); // State to hold individual log hours
  const [allEmployeesLogHours, setAllEmployeesLogHours] = useState(0); // State to hold all employees log hours
  const [showContributionModal, setShowContributionModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/reports');
      const data = response.data.map((report, index) => ({
        ...report,
        projectName: report.projectName?.name || 'N/A',
        employeeId: report.employeeId?.empid || 'N/A',
        employeeName: report.employeeId?.empname || 'N/A',
        logHours: parseFloat(report.logHours), // Parse log hours as float
        date: new Date(report.date).toLocaleDateString(),
        srNo: index + 1, // Serial number
      }));
      setRows(data);

      // Build a map of project names to their respective employee IDs
      const projectEmployees = {};
      data.forEach((report) => {
        const projectName = report.projectName;
        const employeeId = report.employeeId;
        if (projectEmployees[projectName]) {
          if (!projectEmployees[projectName].includes(employeeId)) {
            projectEmployees[projectName].push(employeeId);
          }
        } else {
          projectEmployees[projectName] = [employeeId];
        }
      });
      setProjectEmployeesMap(projectEmployees);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch reports.');
    }
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handleCloseReport = () => {
    setShowReport(false);
    setCurrentReport(null); // Reset currentReport state to null
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
    setSelectedProject(value); // Update selected project
    setSelectedEmployee(''); // Reset selected employee when project changes
  };

  const handleEmployeeChange = (event) => {
    const { target: { value } } = event;
    setSelectedEmployee(value); // Update selected employee
  };

  const handleSelectAllEmployees = () => {
    const allEmployees = projectEmployeesMap[selectedProject] || [];
    setSelectedEmployee('');
  };

  const handleEdit = (report) => {
    setCurrentReport(report); // Set the currentReport state when editing
    setShowReport(true); // Open the modal for editing
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/report/${id}`);
      // Update state by filtering out the deleted report
      setRows((prevRows) => prevRows.filter(row => row._id !== id));
      toast.success('Report deleted successfully');
    } catch (error) {
      console.error('Error deleting report:', error);
      toast.error('Failed to delete report. ');
    }
  };

  // Populate project names and employee IDs for filtering, ensuring unique values
  const projectNames = Array.from(new Set(rows.map((row) => row.projectName)));

  const columns = [
    { field: 'srNo', headerName: 'Sr. No.', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'projectName', headerName: 'Project Name', width: 250, headerAlign: 'center', align: 'center' },
    { field: 'jobRole', headerName: 'Job Role', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'employeeId', headerName: 'Employee ID', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'employeeName', headerName: 'Employee Name', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'date', headerName: 'Date', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'logHours', headerName: 'Log Hours', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'remarks', headerName: 'Remarks', width: 340, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  // Calculate total log hours for individual and all employees' contributions
  const calculateTotalLogHours = () => {
    const individualTotal = filteredRows.reduce((total, row) => total + parseFloat(row.logHours), 0);
    const allEmployeesTotal = rows.filter(row => selectedProject && row.projectName === selectedProject).reduce((total, row) => total + parseFloat(row.logHours), 0);
    return { individualTotal, allEmployeesTotal };
  };

  const filteredRows = rows.filter(row =>
    (!selectedProject || row.projectName === selectedProject) &&
    (!selectedEmployee || row.employeeId === selectedEmployee)
  );

  const handleShowContributionModal = () => {
    const { individualTotal, allEmployeesTotal } = calculateTotalLogHours();
    setIndividualLogHours(individualTotal);
    setAllEmployeesLogHours(allEmployeesTotal);
    setShowContributionModal(true);
  };

  const handleCloseContributionModal = () => {
    setShowContributionModal(false);
  };

  return (
    <>
      <ToastContainer />
      <div className='report'>
        <h2 className=' mb-3 text-center fs-1 fw-bold'>Daily Report</h2>
        <Button className="float-end" sx={{ mr: 5, height: 50, mt: -6 }} variant="contained" onClick={handleShowReport}>Add Report</Button>
        
        <Button className="float-end" sx={{ mr: 2, height: 50, mt: -6 }} onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained">Filter <FilterListIcon id="filterIcon" /></Button>

          <Box sx={{ mt:1, p: 5}}>
          <Button variant="contained" className=" totalloghours float-end" color="primary" onClick={handleShowContributionModal}>Total Log Hours</Button>
        </Box>

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
          <MenuItem>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>Employee Id</InputLabel>
              <Select
              label="Employee Id"
                value={selectedEmployee}
                onChange={handleEmployeeChange}
              >
                <MenuItem value="">All</MenuItem>
                {(projectEmployeesMap[selectedProject] || []).map((employeeId) => (
                  <MenuItem key={employeeId} value={employeeId}>
                    {employeeId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MenuItem>
        </Menu>

        <Box sx={{ height: 650, width: '100%', mt: 1, p: 5 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row._id}
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
          <AddReport currentReport={currentReport} onReportAdded={handleCloseReport} />
        </Modal.Body>
      </Modal>
      
  {/* total log hours modal */}

      <Modal show={showContributionModal} onHide={handleCloseContributionModal} className="loghours-modal">
        <Modal.Header closeButton>
          <Modal.Title>Total Log Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='fw-bold'>Individual Contribution: <span className='hours '> {individualLogHours} hrs</span> </p>
          <p className='fw-bold'>All Employees Contribution: <span className='hours'>
          {allEmployeesLogHours} hrs
          </span> </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseContributionModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
