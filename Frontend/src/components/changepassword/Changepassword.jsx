import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Changepassword.css'
export default function Changepassword() {
  return (
    <div>
        <TextField className="changepass m-3"id="filled-basic" label="Old Password" variant="filled" />
        <TextField className="changepass m-3"id="filled-basic" label="New Password" variant="filled" />
        <TextField className="changepass m-3"id="filled-basic" label="Confirm Password" variant="filled" />
     <Button className="changepass m-3" variant="contained">Submit</Button>
    </div>
  )
}
