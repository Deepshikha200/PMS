import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { FaEye } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const handleEye = () => {
    setShowPassword(true);
  }

  const handleEyetwo = () => {
    setShowPassword(false);
  }
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    jobRole: '',
    password: '',
    confirmPassword: '',
  });

  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate email domain
    if (name === 'firstName' && 'lastName') {
      if (!validateName(value)) {
        setNameError('Please use Alphabets');
      } else {
        setNameError('');
      }
    }

    //Validate name domain 

    if (name === 'email') {
      if (!validateEmailDomain(value)) {
        setEmailError('Only @antiersolutions.com emails are allowed.');
      } else {
        setEmailError('');
      }
    }

    // Validate password strength
    if (name === 'password') {
      if (!validatePassword(value)) {
        setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      } else {
        setPasswordError('');
      }
    }

    // Validate password confirmation
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setConfirmPasswordError('Passwords do not match.');
      } else {
        setConfirmPasswordError('');
      }
    }

    // Check password confirmation on password change
    if (name === 'password' && formData.confirmPassword) {
      if (value !== formData.confirmPassword) {
        setConfirmPasswordError('Passwords do not match.');
      } else {
        setConfirmPasswordError('');
      }
    }
  };

  const validateEmailDomain = (email) => {
    return /@antiersolutions\.com$/.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (firstName) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(firstName);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm()) return;
    if (emailError || passwordError || confirmPasswordError) {
      toast.error('Please fix the errors before submitting.');
      return;
    }
    if (!validatePassword(formData.password)) {
      toast.error('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5050/api/signup', formData);
      toast.success(response.data.message);
      localStorage.setItem('userRole', formData.jobRole);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during signup';
      toast.error(errorMessage);
    }
  };

  return (
    <div className='signup d-flex justify-content-center align-items-center'>
      <ToastContainer />
      <div className='signup-container bg-white text-center'>
        <img className='m-5' src='signup.svg' height={400} width={400} alt='Signup' />
        <form className='signup-item' onSubmit={handleSubmit}>
          <h3 className='text-center mt-4'>Sign up</h3>
          <TextField
            className='signup-textfield m-3 '
            id='firstName'
            name='firstName'
            label='First Name'
            variant='filled'
            value={formData.firstName}
            onChange={handleChange}
           
          />
           {/* {nameError && <div className="nameError">{nameError}</div>} */}

          <TextField
            className='signup-textfield m-3 '
            id='lastName'
            name='lastName'
            label='Last Name'
            variant='filled'
            value={formData.lastName}
            onChange={handleChange}
          />
           {nameError && <div className="nameError">{nameError}</div>}

          <TextField
            className='signup-textfield-email m-3'
            id='email'
            name='email'
            label='Email Id'
            variant='filled'
            value={formData.email}
            onChange={handleChange}
            
          />
           {emailError && <div className="emailerror">{emailError}</div>}
          <TextField
            className='signup-textfield m-3 mt-2 ms-2'
            id='phoneNo'
            name='phoneNo'
            label='Phone No.'
            variant='filled'
            value={formData.phoneNo}
            onChange={handleChange}
           
          />
          <FormControl variant='filled' sx={{ m: 1, ml: 2, minWidth: 200 }}>
            <InputLabel id='jobRoleLabel'>Job Role</InputLabel>
            <Select
              labelId='jobRoleLabel'
              id='jobRole'
              name='jobRole'
              className='signup-role'
              value={formData.jobRole}
              onChange={handleChange}
          
            >
              <MenuItem value=''>Select your role</MenuItem>
              <MenuItem value='tpm'>TPM</MenuItem>
              <MenuItem value='pm'>PM</MenuItem>
              <MenuItem value='ba'>BA</MenuItem>
              <MenuItem value='qa'>QA</MenuItem>
              <MenuItem value='devoops'>Devoops</MenuItem>
              <MenuItem value='developer'>Developer</MenuItem>
              <MenuItem value='tl'>TL</MenuItem>
              <MenuItem value='ui/ux'>UI/UX</MenuItem>
            </Select>
          
          </FormControl>
          <TextField
            className='signup-textfield m-3'
            id='password'
            name='password'
            label='Password'
            variant='filled'
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
        
          />
            {showPassword ? (
                <div className='eyeicon' onClick={handleEyetwo}><AiFillEyeInvisible /></div>
              ) : (
                <div className='eyeicon' onClick={handleEye}><FaEye /></div>
              )}
          <TextField
            className='signup-textfield m-3'
            id='confirmPassword'
            name='confirmPassword'
            label='Confirm Password'
            variant='filled'
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
   
          />
           {passwordError && <div className="passerror">{passwordError}</div>}
            {confirmPasswordError && <div className="cpasserror">{confirmPasswordError}</div>}
          
          <Button className='signup-btn m-4' variant='contained' type='submit'>
            Sign up
          </Button>
          <div className='mb-4'>
            Already have an account? <Link to='/' className='text-decoration-none'> Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

