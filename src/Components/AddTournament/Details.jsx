import React, { useState, useContext, useRef } from 'react';
import { TextField, MenuItem, Button, Box, Typography } from '@mui/material';
import Hosthome from './Hosthome';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Context/AuthConntext';
import axios from 'axios';
import { baseUrl } from '../baseUrl';


export default function Details() {
  const [formValues, setFormValues] = useState({
    tournamentName: '',
    sportType: '',
    format: '',
    startDate: '',
    endDate: '',
    maxTeams: '',
  });
  const [formVisible, setFormVisible] = useState(true);
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  const submitRef = useRef(
    {
      tournamentName: '',
      sportType: '',
      format: '',
      startDate: '',
      endDate: '',
      maxTeams: '',


    }
  )


  const formats = ['Group', 'Group & Knockout', 'Knockout'];
  const handleChange = (e) => {
    const { name, value } = e.target;
    submitRef.current[name] = value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const submitButtonClickHandler = async (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formValues);

    const { tournamentName, format, sportType, startDate, endDate, maxTeams } = submitRef.current

    try {
      const response = await axios.post(`${baseUrl}/api/Tournaments`, {
        Name: tournamentName,
        Format: format,
        SportType: sportType,
        StartDate: startDate,
        EndDate: endDate,
        MaxTeams: maxTeams,
        HostedBy: user.userId,
        Status: 'false'
      });

      if (response.status === 201) {

        setFormVisible(true);
        toast.success(
          <div>
            <Typography variant="body2">Form Submitted Successfully!</Typography>
          </div>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          }
        );
        setTimeout(() => {
          navigate('/addtournament/host-home')
        }, 3000);
      };
    } catch (error) {

      console.error('Error during submit:', error);
      toast.warning(
        <div>
          <Typography variant="body2">Form Not Submited!</Typography>
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
      console.log(user.userId)
    }
  }



  // Show toast with a button to navigate to "Menu-Live Tournament"

  return (
    <>
      {formVisible ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            maxWidth: 400,
            height: 'auto',
            margin: 'auto',
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: 'white',
            mt: 6,
            position: 'fixed',
            ml: 70,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Tournament Details
          </Typography>
          <form onSubmit={submitButtonClickHandler} style={{ width: '100%' }}>
            <TextField
              label="Tournament Name"
              name="tournamentName"
              value={formValues.tournamentName}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Sport Type"
              name="sportType"
              value={formValues.sportType}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Format"
              name="format"
              value={formValues.format}
              onChange={handleChange}
              select
              fullWidth
              required
              margin="dense"
            >
              {formats.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={formValues.startDate}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={formValues.endDate}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Max Teams"
              name="maxTeams"
              type="number"
              value={formValues.maxTeams}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
              inputProps={{ min: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, backgroundColor: 'purple' }}
            >
              Submit
            </Button>
          </form>
        </Box>
      ) : (
        <Hosthome />
      )}

      {/* Toast Container for showing toasts */}
      <ToastContainer />
    </>
  );
}
