import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import {Link} from 'react-router-dom';
import './Createproject.css'
import { Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
export default function CreateProject() {
  const[rows,setrows]=useState([{id:1}])
  function handleaddrow()
    {
      const newrow=([{id:rows.length+1}]);
      setrows([...rows,...newrow]);
    }
    const handleDeleteRow = (idToDelete) => {
      const updatedRows = rows.filter((row) => row.id !== idToDelete);
      setrows(updatedRows);
    };
  


  return (
    <div className='createproject'>
        <TextField className="name" id="outlined-basic" label="Project Name" variant="outlined" />
        <FormControl className='status'>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status"
                        className=''>
                         <MenuItem value="start">Start</MenuItem>
                         <MenuItem value="archive">Active</MenuItem>
                         <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                    
            </FormControl>
            
      
            <TextField className='hourlyrate mx-4'  label="Hourly rate" variant="outlined" type="number"/>
            <TextField  className='budget' label="Budget" variant="outlined" type="number"/>
             <hr/>
        <InputLabel className="projectteam text-black" id="demo-simple-select-filled-label">Project Team</InputLabel>
        {rows.map((item,index)=>(
        <div  key={item.id}>
        <FormControl  sx={{ m:1, ml:4,mt:2, minWidth: 186 }}>
                <InputLabel id="demo-simple-select-label">Job role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Job role"
                        className=''>
                          <MenuItem value="tpm">TPM</MenuItem>
                         <MenuItem value="pm">PM</MenuItem>
                         <MenuItem value="ba">BA</MenuItem>
                         <MenuItem value="qa">QA</MenuItem>
                         <MenuItem value="devoops">Devoops</MenuItem>
                         <MenuItem value="developer">Developer</MenuItem>
                         <MenuItem value="tl">TL</MenuItem>
                         <MenuItem value="ui/ux">UI/UX</MenuItem>
                    </Select>
            </FormControl>
            <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 186 }}>
        <Autocomplete
          options={['A', 'B', 'C']}
          renderInput={(params) => (
            <TextField {...params} label="Teams" variant="outlined" />
          )}
        />
      </FormControl>
      <FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 186 }}>
        <Autocomplete
          options={['Rahul', 'Mohit', 'Ram']}
          renderInput={(params) => (
            <TextField {...params} label="Members" variant="outlined" />
          )}
        />
      </FormControl>
      {index !== 0 && <DeleteIcon className='deleteicon' onClick={() => handleDeleteRow(item.id)} />}
      </div>
       ) )}
      <Link className='addnewemp text-black text-decoration-none ' onClick={handleaddrow}>+ Add new Employee</Link>
      <hr/>
      <Button className="createproject-btn  float-end " variant="contained" >Create</Button>
        
    </div>
  )
}
