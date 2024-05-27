import React,{useState,useEffect} from 'react'
import './Employees.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { gridClasses } from '@mui/material';
import { grey } from '@mui/material/colors'; 

export default function Employees() {
    const [rows, setRows] = useState([]);
    // const[pagesize,setpagesize]=useState(10);

    useEffect(() => {
      fetchData();
    }, []); 
  
    const fetchData = async () => {
      try {
  
        const response = await fetch('your_backend_endpoint'); //deepshikha yeh change kr diyo jo tujhe link dena h backend ke liye
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
  const columns = [
    { field: 'id', headerName: 'Sr no.', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Name', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'role', headerName: 'Job Role', width: 300, headerAlign: 'center', align: 'center', type:"singleSelect",valueOptions:['TPM','PM','BA','QA','Devoops','UI/UX','Devlopers','TL'],editable:true},
    { field: 'team', headerName: 'Team', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'status', headerName: 'Status', width: 300, headerAlign: 'center', align: 'center' }
  ];
  const getRowSpacing = (params) => {
    return params.rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
};

  return (
    <div className='report'>
      <h2 className='mt-5 mb-3 text-center fs-1 fw-bold '>Employees List</h2>
      <Box sx={{ height: 560, width: '100%' ,p:5}}>
      <DataGrid
        rows={rows}
        columns={columns}
        headerClassName='custom-header'
        paginationClassName='custom-pagination'
        // pageSize={pagesize}
        // onPageSizeChange={(newPageSize)=>setpagesize(newPageSize)}
        getRowSpacing= {getRowSpacing}
        sx={{
            '& .odd-row': {
                backgroundColor: grey[200],
            },
            '& .even-row': {
                backgroundColor: grey[100],
            },
            // '.custom-pagination': {
            //     backgroundColor: '#000', 
            // },
            // '& .MuiDataGrid-columnsContainer': {
            //     backgroundColor: '#f0f0f0', // Background color for header
            // },
        }}
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
  )
}
