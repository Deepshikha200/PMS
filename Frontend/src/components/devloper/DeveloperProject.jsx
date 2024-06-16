import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function DeveloperProject() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const developerId = localStorage.getItem('userId');
      if (!developerId) {
        console.error('Developer ID not found.');
        return;
      }

      const response = await axios.get(`http://localhost:5050/api/developer/${developerId}`);
      const projects = response.data;
      // Transforming projects into rows for DataGrid
      const transformedRows = projects.map((project, index) => ({
        id: index + 1,
        name: project.name,
        createdBy: project.createdBy.empname,
        status: project.status,
      }));

      setRows(transformedRows);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'Sr no.', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Project Name', width: 400, headerAlign: 'center', align: 'center' },
    { field: 'createdBy', headerName: 'Created By', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'status', headerName: 'Status', width: 300, headerAlign: 'center', align: 'center' },
  ];

  return (
    <>
      <h2 className='text-center fs-1 fw-bold mt-5'>Project List</h2>
      <Box sx={{ height: 650, width: '100%', mt: 3, p: 5 }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
    </>
  );
}
