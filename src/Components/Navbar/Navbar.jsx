import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonAdd from '@mui/icons-material/PersonAdd';
import SignupComponent from '../RegAndLog/SignupComponent';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginComponent from '../RegAndLog/LoginComponent';

const Navbar = () => {
  const [open, setOpen] = useState(false); // Modal state
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Functions to control modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  // Show modal when navigating to /signup
  useEffect(() => {
    if(location.pathname === '/signup') {
      setShowLogin(false);
      setShowSignup(true);
    }
    else if(location.pathname === '/login') {
      setShowLogin(true);
      setShowSignup(false);
    }
    else {
      setShowLogin(false);
      setShowSignup(false);
    }
  }, [location]);
  
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          display: 'flex',
          bgcolor: 'white',
          height: '60px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1301,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: 'black' }}>
              G a m e H o s t
            </Typography>
          </div>
          <div>
            {/* Login Button */}
            <Button
              color="inherit"
              sx={{
                color: 'black',
                padding: '5px',
                '&:hover': {
                  backgroundColor: 'rgb(230, 230, 231)',
                  color: 'black',
                },
                marginRight: '15px',
              }}
              onClick={() => navigate('/login')}
            >
              <AccountCircle sx={{ marginRight: '5px' }} />
              Login
            </Button>

            {/* Signup Button */}
            <Button
              color="inherit"
              sx={{
                color: 'white',
                padding: '5px 15px',
                borderRadius: '10px',
                bgcolor: 'purple',
                '&:hover': {
                  backgroundColor: 'purple',
                  color: 'white',
                },
              }}
              onClick={() => navigate('/signup')}
            >
              <PersonAdd sx={{ marginRight: '5px' }} />
              Signup
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Modal for Signup */}
      <SignupComponent open={showSignup} handleClose={handleClose} />
      <LoginComponent open = {showLogin} handleClose={handleClose}/>
    </>
  );
};

export default Navbar;
