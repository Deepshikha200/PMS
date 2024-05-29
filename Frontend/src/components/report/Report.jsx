import React, { useState, useEffect } from 'react';
import './Report.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddReport from '../add_report/AddReport.jsx'
import Modal from 'react-bootstrap/Modal';

export default function Report() {
  const[showReport,setShowReport]=useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    try {
      const response = await fetch('your_backend_endpoint');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  function handleShowReport()
  {
     setShowReport(true)
  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'ProjectName', headerName: 'Project Name', width: 250, headerAlign: 'center', align: 'center' },
    { field: 'Name', headerName: 'Name', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'JobRole', headerName: 'Job Role', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'Date', headerName: 'Date', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'Duration', headerName: 'Duration', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'remarks', headerName: 'Remarks', width: 400, headerAlign: 'center', align: 'center' }
  ];
  
  return (
    <>
    <div className='report'>
      <h2 className='mt-5 mb-3 text-center fs-1 fw-bold'>Daily Report</h2>
      <Button className="float-end " sx={{mr:15,height:50,mt: -6}}variant="contained" onClick={handleShowReport}>Add Report</Button>
      <Box sx={{ height: 650, width: '100%',mt:3 ,p:5 }}>
        <DataGrid
         
    
          rows={rows}
          columns={columns}
         
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
    <Modal  show={showReport} onHide={()=>setShowReport(false)} className="report-modal">
      <Modal.Header closeButton>
          <Modal.Title >Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddReport/>
        </Modal.Body>
      </Modal>
    </>
  );
}
