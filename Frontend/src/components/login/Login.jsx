import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';
import ForgotpassModal from '../forgotpass/ForgotpassModal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEye = () => {
    setShowPassword(true);
  }

  const handleEyetwo = () => {
    setShowPassword(false);
  }

  const handleForgotPass = () => { 
    setShowForgotPasswordModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5050/api/v1/login', formData);

      // Display success toast
      toast.success('Login successful!');

      // Extract jobRole and userId from response
      const { jobRole, userId, token } = response.data;

      // Store token and userId in local storage
      localStorage.setItem('userId', userId);
      localStorage.setItem('jobRole', jobRole);
      localStorage.setItem('token', token);

      // Navigate based on jobRole after a delay
      setTimeout(() => {
        if (jobRole === 'DEVELOPER') {
          navigate('/developer/developer-project');
        } else {
          navigate('/project');
          
        }
      }, 2000); // 2000 milliseconds delay
    } catch (error) {
      toast.error(error.response?.data?.error || 'An unexpected error occurred');
    }
  };

  return (
    <>
      <div className='login d-flex justify-content-center align-items-center'>
        <ToastContainer />
        <div className='login-container bg-white text-center'>
          <img className="m-5" src="login.svg" height={400} width={400} alt="Login Illustration" />
          <div className='login-item'>
            <form onSubmit={handleSubmit}>
              <h3 className='text-center mt-5'>Sign in</h3>
              <TextField
                className="login-textfield m-4"
                id="email"
                name="email"
                label="Email Id"
                variant="filled"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                className="login-textfield m-4"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="filled"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              {showPassword ? (
                <div className='eyeicon' onClick={handleEyetwo}><AiFillEyeInvisible /></div>
              ) : (
                <div className='eyeicon' onClick={handleEye}><FaEye /></div>
              )}
              <Link className="login-forgotpass-link text-decoration-none" onClick={handleForgotPass}>Forgot password?</Link>
              <Button className="login-btn m-4" variant="contained" type="submit">Sign in</Button>
              <div className='mt-4'>Don't have an account? 
                <Link to="/signup" className='text-decoration-none'> Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal show={showForgotPasswordModal} onHide={() => setShowForgotPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ForgotpassModal />
        </Modal.Body>
      </Modal>
    </>
  );
}
