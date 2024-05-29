import React, { useState, useEffect } from 'react';
import './Developerreport.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddReport from '../add_report/AddReport.jsx'
import Modal from 'react-bootstrap/Modal';

export default function DeveloperReport() {
  const[showReport,setShowReport]=useState(false);
  const [rows, setRows] = useState([]);

  function handleShowReport()
  {
     setShowReport(true)
  }

  const columns = [
    { field: 'ProjectName', headerName: 'Project Name', width: 400, headerAlign: 'center', align: 'center' },
    { field: 'Date', headerName: 'Date', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'ShiftStart', headerName: 'Shift-Start', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'ShiftEnd', headerName: 'Shift-End', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'remarks', headerName: 'Remarks', width: 400, headerAlign: 'center', align: 'center' }
  ];
  
  return (
    <>
    <div className='developerreport'>
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
        />
      </Box>
     
    </div>
    <Modal  show={showReport} onHide={()=>setShowReport(false)} className="developerreport-modal">
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
