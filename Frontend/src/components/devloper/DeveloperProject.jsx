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
      const response = await axios.get(`http://localhost:5050/api/developer/projects/${developerId}`);
      if (!response.data) {
        throw new Error('Failed to fetch projects');
      }

      const projectsData = response.data.projects.map((project, index) => ({
        id: index + 1,
        name: project.name,
        createdBy: `${project.createdBy.firstName} ${project.createdBy.lastName}`, 
        team: project.team.map(teamMember => teamMember.team).join(', '), 
      }));
    
      setRows(projectsData);

    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const columns = [   
     { field: 'id', headerName: 'Sr no.', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Project Name', width: 600, headerAlign: 'left', align: 'left' },
    { field: 'createdBy', headerName: 'Created By', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'status', headerName: 'Status', width: 300, headerAlign: 'center', align: 'center' },
    // { field: 'team', headerName: 'Team', width: 300, headerAlign: 'center', align: 'center' },
  ];

  return (
    <>
      <h2 className='text-center fs-1 fw-bold mt-5'>Assigned Projects</h2>
      <Box sx={{ height: 650, width: '100%', mt: 3, p: 5 }}>
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
    </>
  );
}