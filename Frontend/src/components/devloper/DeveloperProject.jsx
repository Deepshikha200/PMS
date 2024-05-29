import React,{useState} from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
export default function DeveloperProject() {
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'ProjectName', headerName: 'Project Name', width: 400, headerAlign: 'center', align: 'center' },
        { field: 'Assigned by', headerName: 'Date', width: 400, headerAlign: 'center', align: 'center' },
        { field: 'Team', headerName: 'Team', width: 400, headerAlign: 'center', align: 'center' },
      
      ];
  return (
      <>
       <h2  className=' text-center fs-1 fw-bold mt-5'>Project List</h2>
      <Box sx={{ height: 650, width: '100%',mt:3 ,p:5  }}>
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

    