// import React from 'react'
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import './Changepassword.css'
// export default function Changepassword() {
//   return (
//     <div>
//         <TextField className="changepass m-3"id="filled-basic" label="Old Password" variant="filled" />
//         <TextField className="changepass m-3"id="filled-basic" label="New Password" variant="filled" />
//         <TextField className="changepass m-3"id="filled-basic" label="Confirm Password" variant="filled" />
//      <Button className="changepass m-3" variant="contained">Submit</Button>
//     </div>
//   )
// }


import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Changepassword.css';

export default function Changepassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const userId = localStorage.getItem('userId'); 
      const response = await axios.post('http://localhost:5050/api/change-password', {
        userId,
        currentPassword: oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully");
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An unexpected error occurred");
    }
  };

  return (
    <div>
      <ToastContainer />
      <TextField
        className="changepass m-3"
        id="old-password"
        label="Old Password"
        type="password"
        variant="filled"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <TextField
        className="changepass m-3"
        id="new-password"
        label="New Password"
        type="password"
        variant="filled"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        className="changepass m-3"
        id="confirm-password"
        label="Confirm Password"
        type="password"
        variant="filled"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        className="changepass m-3"
        variant="contained"
        onClick={handleChangePassword}
      >
        Submit
      </Button>
    </div>
  );
}
