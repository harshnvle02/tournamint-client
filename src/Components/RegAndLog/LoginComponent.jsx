import React, { useState } from 'react';
import { Modal, Box, TextField, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRef, useContext } from 'react';
import { AuthContext } from '../../Context/AuthConntext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../baseUrl';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};


const LoginComponent = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const formRef = useRef({
    uname: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const loginClickHandler = async () => {
    const { uname, email, password } = formRef.current;


    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/users/login`, {
        Username: uname,
        Email: email,
        PasswordHash: password,
      });
      console.log(response.data);

      setLoading(false);

      if (response.status === 200) {
        toast.success(
          <Typography variant="body1">Login Successfully!</Typography>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          }
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));




        login(response.data);
        handleClose();
        navigate("/addtournament/help");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        console.log(error.response.data);
        const errorMessage = error.response.data;
        toast.warning(
          <Typography variant="body1">{errorMessage}</Typography>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          }
        );
      } else {
        toast.error(
          <Typography variant="body1">Login failed. Please try again.</Typography>,
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


  const handleSignupRedirect = () => {
    navigate('/signup');
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    formRef.current[name] = value;
  };


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="login-modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
            Log in
          </Typography>
          <TextField
            fullWidth
            name="uname"
            label="Name"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            type="text"
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            type="email"
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            type="password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={loginClickHandler}
            sx={{ mt: 2, p: 1, bgcolor: 'purple' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={handleSignupRedirect}
              sx={{ color: 'purple', textDecoration: 'underline' }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};


export default LoginComponent;

