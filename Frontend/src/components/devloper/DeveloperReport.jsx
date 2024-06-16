import React, { useState, useEffect } from 'react';
import './Developerreport.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeveloperAddReport from './developer_addreport/DeveloperAddReport.jsx';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function DeveloperReport() {
  const [showReport, setShowReport] = useState(false);
  const [rows, setRows] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);

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
          <Modal.Title>{currentReport ? 'Edit Report' : 'Add Report'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeveloperAddReport
            onReportAdded={handleCloseReport}
            currentReport={currentReport} // Pass currentReport to DeveloperAddReport
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
