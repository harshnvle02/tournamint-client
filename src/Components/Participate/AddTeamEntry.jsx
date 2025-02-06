import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../baseUrl';


const AddTeamEntry = () => {
  const [teamName, setTeamName] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [captainName, setCaptainName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const tournamentDetails = location.state || {};
  const max = tournamentDetails?.tournament?.maxTeams || 0; 


  const submitClickHandler = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${baseUrl}/api/Teams/team/${max}`, {
        TeamName: teamName,
        MaxPlayers: parseInt(numPlayers),
        CaptainName: captainName,
        TournamentID: tournamentDetails.tournament.tournamentId,
      });

      if (response.status === 201) { 
        toast.success(
          <Typography variant="body1">Team Added Successfully!</Typography>, 
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          }
        );
        //navigate("/addtournament/performance");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.warning(
          <Typography variant="body1">{error.response.data}</Typography>, // Fix: Correct Typography variant
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          }
        );
      } else {
        toast.error(
          <Typography variant="body1">Something went wrong. Please try again.</Typography>,
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
      <Box
        component="div"
        sx={{
          width: '700px',
          marginLeft: 10,
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            marginBottom: 20,
            marginLeft: 10,
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
   
          <form onSubmit={submitClickHandler}>
            <Stack spacing={2}>
              <Typography variant="h6" align="center">
                Team Information
              </Typography>

              <TextField
                label="Team Name"
                name="tname"
                variant="outlined"
                fullWidth
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />

              <TextField
                label="How many players"
                name="players"
                variant="outlined"
                fullWidth
                type="number"
                value={numPlayers}
                onChange={(e) => setNumPlayers(e.target.value)}
                required
              />

              <TextField
                label="Captain Name"
                name="cname"
                variant="outlined"
                fullWidth
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                required
              />

              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default AddTeamEntry;
