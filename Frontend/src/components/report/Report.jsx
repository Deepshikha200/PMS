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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Report() {
  const [showReport, setShowReport] = useState(false);
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [currentReport, setCurrentReport] = useState(null); // State to hold the currently selected report for editing

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
        logHours: report.logHours,
        date: new Date(report.date).toLocaleDateString(),
        srNo: index + 1, // Serial number
      }));
      setRows(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch reports. Please check the console for more details.');
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

  const columns = [
    { field: 'srNo', headerName: 'Sr. No.', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'projectName', headerName: 'Project Name', width: 250, headerAlign: 'center', align: 'center' },
    { field: 'jobRole', headerName: 'Job Role', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'employeeId', headerName: 'Employee ID', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'employeeName', headerName: 'Employee Name', width: 250, headerAlign: 'center', align: 'center' },
    { field: 'date', headerName: 'Date', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'logHours', headerName: 'Log Hours', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'remarks', headerName: 'Remarks', width: 300, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
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

  const filteredRows = rows.filter(row =>
    (selectedProjects.length === 0 || selectedProjects.includes(row.projectName)) &&
    (selectedEmployees.length === 0 || selectedEmployees.includes(row.employeeId))
  );

  return (
    <>
      <ToastContainer />
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
              <InputLabel>Employee Id</InputLabel>
              <Select
                multiple
                value={selectedEmployees}
                onChange={handleEmployeeChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {rows.map((row) => (
                  <MenuItem key={row.employeeId} value={row.employeeId}>
                    <Checkbox checked={selectedEmployees.indexOf(row.employeeId) > -1} />
                    <ListItemText primary={row.employeeId} />
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
    </>
  );
}
