import React, { useState, useEffect } from 'react';
import './Employees.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

export default function Employees() {
  const [rows, setRows] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);


  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/jobrole');
        if (!response.ok) {
          throw new Error('Failed to fetch job roles');
        }
        const data = await response.json();
        setJobRoles(data);
      } catch (error) {
        console.error('Error fetching job roles:', error);
      }
    };
  
    fetchJobRoles();
  }, []);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const employeesResponse = await fetch('http://localhost:5050/api/employees');
      if (!employeesResponse.ok) {
        throw new Error('Failed to fetch employee data');
      }
      const employeesData = await employeesResponse.json();
  
      const projectsResponse = await fetch('http://localhost:5050/api/projects');
      if (!projectsResponse.ok) {
        throw new Error('Failed to fetch project data');
      }
      const projectsData = await projectsResponse.json();
  
      const mappedData = employeesData.map((employee, index) => {
        // Check if the employee is associated with any project
        const isOccupied = projectsData.some(project => project.team.some(member => member.member === employee._id));
        const status = isOccupied ? 'Occupied' : 'Available';
  
        return {
          id: index + 1,
          name: `${employee.firstName} ${employee.lastName}`,
          role: employee.jobRole.name,
          email: employee.email,
          status: status
        };
      });
  
      setRows(mappedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const columns = [
    { field: 'id', headerName: 'Sr no.', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Name', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'role', headerName: 'Job Role', width: 300, headerAlign: 'center', align: 'center', type: 'singleSelect', valueOptions: jobRoles.map(role => role.name), editable: true },
    { field: 'email', headerName: 'Email', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'status', headerName: 'Status', width: 300, headerAlign: 'center', align: 'center', renderCell: (params) => (
        <div style={{ color: params.value === 'Available' ? 'green' : 'red' }}>
          {params.value}
        </div>
      )
    }
  ];
  
  
  return (
    <div className='report'>
      <h2 className='mt-5 mb-3 text-center fs-1 fw-bold '>Employees List</h2>
      <Box sx={{ height: 560, width: '100%', p: 5 }}>
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
              backgroundColor: '#000',
            },
          }}
        />
      </Box>
    </div>
  );
}
