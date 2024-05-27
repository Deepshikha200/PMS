import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Forgotpass.css'
export default function ForgotpassModal({ handleClose }) {
  return (
   <>
     <TextField className="forgotpass m-4"id="filled-basic" label="Email Id" variant="filled" />
     <Button className="forgotpass m-4" variant="contained">Submit</Button>
   </>
  );
}
