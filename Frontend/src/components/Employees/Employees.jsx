import React, { useState, useEffect } from 'react';
import './Employees.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

export default function Employees() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      
      
      const mappedData = data.map((employee, index) => ({
        id: index + 1, // Sequential number as Sr no.
        name: `${employee.firstName} ${employee.lastName}`,
        role: employee.jobRole,
        email: employee.email,
        status: employee.status
      }));

      setRows(mappedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'Sr no.', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Name', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'role', headerName: 'Job Role', width: 300, headerAlign: 'center', align: 'center', type: 'singleSelect', valueOptions: ['TPM', 'PM', 'BA', 'QA', 'Devoops', 'UI/UX', 'Developers', 'TL'], editable: true },
    { field: 'email', headerName: 'Email', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'status', headerName: 'Status', width: 300, headerAlign: 'center', align: 'center' }
  ];

  const getRowSpacing = (params) => {
    return params.rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
  };

  return (
    <div className='report'>
      <h2 className='mt-5 mb-3 text-center fs-1 fw-bold '>Employees List</h2>
      <Box sx={{ height: 560, width: '100%', p: 5 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowSpacing={getRowSpacing}
        //   sx={{
        //     '& .odd-row': {
        //       backgroundColor: grey[200],
        //     },
        //     '& .even-row': {
        //       backgroundColor: grey[100],
        //     },
        //     // '.custom-pagination': {
        //     //     backgroundColor: '#000', 
        //     // },
        //     // '& .MuiDataGrid-columnsContainer': {
        //     //     backgroundColor: '#f0f0f0', // Background color for header
        //     // }, 
        // }}
      
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
