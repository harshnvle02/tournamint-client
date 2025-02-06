import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link'; // Import Link from MUI
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../baseUrl';


// Styles for the Modal
const modalStyle = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};


const SignupComponent = ({ open, handleClose }) => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    uname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const [errors, setErrors] = useState({
    uname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', 
    }));
  };


  const handleLoginRedirect = () => {
    navigate('/login');
  };


  const validateForm = () => {
    const { uname, email, password, confirmPassword } = formData;
    const newErrors = {};
 
    // Simple password regex: Minimum 8 characters, at least one letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;


   
    if (!uname) newErrors.uname = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters, include a letter, number, and special character';
    }
 
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if(!email.includes("@")){
      newErrors.email ='Email must Contain @ Sign'  
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  // Signup Handler
  const signupButtonClickHandler = async (e) => {
    e.preventDefault();


    if (!validateForm()) return; 
    const { uname, email, password } = formData;


    try {
      // Send signup data to the backend
      const response = await axios.post(`${baseUrl}/api/Users`, {
        username: uname,
        email: email,
        passwordHash: password,
      });
      console.log('Response Signup:');
      console.log(response.status);


      if (response.status === 201) {
        toast.success(
        <Typography variant="body1">Signup Successfully!</Typography>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
        handleClose(); // Close the modal
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data?.message || "An unexpected error occurred.";
       
        toast.warning(
          <Typography variant="body1">{errorMessage}</Typography>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          }
        );
      }
      else {
        toast.error(
          <Typography variant="body1">Signup failed. Please try again.</Typography>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          }
        );
      }
    }
  };


  return (
    <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="signup-modal-title"
      aria-describedby="signup-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="signup-modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
          Signup Form
        </Typography>


        {/* Name input */}
        <TextField
          fullWidth
          name="uname"
          label="Name"
          value={formData.uname}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type="text"
          error={Boolean(errors.uname)}
          helperText={errors.uname}
          FormHelperTextProps={{
            sx: {
              fontSize: '0.75rem', // Reduce the font size of the error message
            }
          }}
        />


        {/* Email input */}
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type="email"
          error={Boolean(errors.email)}
          helperText={errors.email}
          FormHelperTextProps={{
            sx: {
              fontSize: '0.75rem',
            }
          }}
        />


        {/* Password input */}
        <TextField
          fullWidth
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type="password"
          error={Boolean(errors.password)}
          helperText={errors.password}
          FormHelperTextProps={{
            sx: {
              fontSize: '0.75rem',
            }
          }}
        />


        {/* Confirm Password input */}
        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type="password"
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
          FormHelperTextProps={{
            sx: {
              fontSize: '0.75rem',
            }
          }}
        />


        {/* Signup Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            p: 1,
            bgcolor: 'purple',
          }}
          onClick={signupButtonClickHandler}
        >
          Signup
        </Button>


        {/* Login redirect */}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={handleLoginRedirect}
            sx={{ color: 'purple', textDecoration: 'underline' }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Modal>
    <ToastContainer />
    </>
  );
};


export default SignupComponent;


