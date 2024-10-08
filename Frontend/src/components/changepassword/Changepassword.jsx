
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Changepassword.css';
import { FaEye } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import CryptoJS from 'crypto-js';

export default function Changepassword() {
  const [shownewPassword, setnewShowPassword] = useState(false);
  const [showconfirmPassword, setconfirmShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEye = () => {
    setnewShowPassword(true);
  }

  const handleEyetwo = () => {
    setnewShowPassword(false);
  }
  const handleEyeconfirm = () => {
    setconfirmShowPassword(true);
  }

  const handleEyeconfirmtwo = () => {
    setconfirmShowPassword(false);
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const encryptedOldPassword = CryptoJS.AES.encrypt(oldPassword, 'your_secret_key').toString();
      const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, 'your_secret_key').toString();

      const response = await axios.post('http://localhost:5050/api/v1/change-password', {
        userId,
        currentPassword: encryptedOldPassword,
        newPassword: encryptedNewPassword,
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
        type={shownewPassword ? "text" : "password"}
        variant="filled"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}

      />
      {shownewPassword ? (
        <div className='eyeicon' onClick={handleEyetwo}><AiFillEyeInvisible /></div>
      ) : (
        <div className='eyeicon' onClick={handleEye}><FaEye /></div>
      )}
      <TextField
        className="changepass m-3"
        id="confirm-password"
        label="Confirm Password"
        type={showconfirmPassword ? "text" : "password"}
        variant="filled"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {showconfirmPassword ? (
        <div className='eyeicon' onClick={handleEyeconfirmtwo}><AiFillEyeInvisible /></div>
      ) : (
        <div className='eyeicon' onClick={handleEyeconfirm}><FaEye /></div>
      )}
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
