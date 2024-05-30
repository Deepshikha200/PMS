import React,{useState} from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function Projecttable() {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: 'id', headerName: 'Sr no.', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'ProjectName', headerName: 'Project Name', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'Createdby', headerName: 'Created By', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'Members', headerName: 'Members', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'status', headerName: 'Status', width: 300, headerAlign: 'center', align: 'center' }
  ];


  return (
    <div className=''>
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