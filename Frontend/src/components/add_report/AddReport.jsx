import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Textarea from '@mui/joy/Textarea';
import './AddReport.css'
export default function AddReport() {
    const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className='addreport'>
<FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 435 }}>
        <Autocomplete
          options={['a', 'b', 'c']}
          renderInput={(params) => (
            <TextField {...params} label="Project Name" variant="outlined" />
          )}
        />
        </FormControl>
<FormControl sx={{ m: 1, ml: 2, mt: 2, minWidth: 200 }}>
        <Autocomplete
          options={['x', 'y', 'z']}
          renderInput={(params) => (
            <TextField {...params} label="Employee Name" variant="outlined" />
          )}
        />

      </FormControl>
      <FormControl  sx={{ m:1, ml:3,mt:2, minWidth: 200 }}>
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
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DesktopDatePicker']}>
                        <DesktopDatePicker className='reportdate'
                            label="Date"
                        />
                </DemoContainer>
            </LocalizationProvider>
            <TextField className='shiftstart'  label="Shift Start" variant="outlined" />
            <TextField className='shiftend'  label="Shift End" variant="outlined" />
            
            <Textarea className="remarks"
             placeholder="Remarks"
            //   defaultValue="Try to put text longer than 4 lines."
               minRows={3}
              maxRows={6}
/>
<Button className="addbtn float-end me-5 mt-3 mb-3" variant="contained" >Add</Button>
    </div>
  )
}
