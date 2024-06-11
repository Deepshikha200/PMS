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


export default function Report() {
  const [showReport, setShowReport] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/reports');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handleCloseReport = () => {
    setShowReport(false);
    fetchData(); // Refresh the data after closing the modal
  };

  const columns = [
    { field: 'projectName', headerName: 'Project Name', width: 300, headerAlign: 'center', align: 'center', valueGetter: (params) => params.row.projectName?.name || 'N/A' },
    { field: 'jobRole', headerName: 'Job Role', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'employeeName', headerName: 'Employee Name', width: 250, headerAlign: 'center', align: 'center', valueGetter: (params) => `${params.row.employeeName.email}` },
    { field: 'date', headerName: 'Date', width: 150, headerAlign: 'center', align: 'center', valueGetter: (params) => new Date(params.row.date).toLocaleDateString() },
    // { field: 'shiftStart', headerName: 'Shift Start', width: 150, headerAlign: 'center', align: 'center' },
    // { field: 'shiftEnd', headerName: 'Shift End', width: 150, headerAlign: 'center', align: 'center' },
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
          <IconButton >
            <EditIcon />
          </IconButton>
          <IconButton >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }

  ];
   
  return (
    <>
      <div className='report'>
        <h2 className='mt-5 mb-3 text-center fs-1 fw-bold'>Daily Report</h2>
        <Button className="float-end" sx={{ mr: 15, height: 50, mt: -6 }} variant="contained" onClick={handleShowReport}>Add Report</Button>
        <Box sx={{ height: 650, width: '100%', mt: 3, p: 5 }}>
          <DataGrid
            rows={rows}
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
