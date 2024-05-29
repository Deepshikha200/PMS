import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Forgotpass.css'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
export default function ForgotpassModal({ handleClose }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/api/forgotpassword', { email });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } catch (error) {
      console.error('Forgot password error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    }
  };
  return (
   <>
   <ToastContainer/>
   <form onSubmit={handleSubmit}>
     <TextField className="forgotpass m-4"id="filled-basic" label="Email Id" variant="filled"  value={email}
            onChange={handleChange} />
     <Button className="forgotpass m-4" variant="contained">Submit</Button>
     </form>
   </>
  );
}
