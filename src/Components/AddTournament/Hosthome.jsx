import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box, Grid2 } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthConntext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../baseUrl';

export default function Hosthome() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [tournamenList, setTournamentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/Tournaments/${user.userId}`);
        if (response) {
          setTournamentList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  const generateClickHandler = async (tournament) => {
    try {
      const response = await axios.get(`${baseUrl}/api/TeamMatches/generate/${tournament.tournamentId}`);
      if (response.status === 200) {
        navigate(`/addtournament/generate?tournamentId=${tournament.tournamentId}`);
      }
    } catch (error) {
      toast.warning(
        <div>
          <Typography variant="body2">Not sufficient teams to generate matches</Typography>
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
      console.log(error);
    }
  };

  const ManageClickHandler = (tournament) => {
    navigate(`/addtournament/generate?tournamentId=${tournament.tournamentId}`);
  }

  const createButtonClickHandler = () => {
    navigate('/addtournament/add');
  }
  return (
    <div className='divStyle'>
      <ToastContainer />
      {tournamenList.length > 0 ?
      <Grid2 container spacing={3} justifyContent="center" sx={{ width: "85vw", marginTop: '20px', marginRight: "auto", marginLeft: 'auto' }}>
        {
          tournamenList.map(tournament => (
            <Grid2 item xs={12} sm={6} md={4} lg={3} key={tournament.tournamentId}>
              <Card sx={{ height: '350px', maxWidth: 300, boxShadow: 3, borderRadius: 2, p: 2 }}>
                <CardContent>
                  {tournament.status === 'true' ? <Typography variant='h4' sx={{ fontWeight: 'bold', }}>Tournament Ended!</Typography> : null}
                  <Typography variant="h5" gutterBottom>
                    {tournament?.name.toUpperCase()}
                  </Typography>
                  <Typography variant="body1"><strong>Sport:</strong> {tournament?.sportType}</Typography>
                  <Typography variant="body1"><strong>Format:</strong> {tournament?.format}</Typography>
                  <Typography variant="body1"><strong>Start Date:</strong> {tournament?.startDate}</Typography>
                  <Typography variant="body1"><strong>End Date:</strong> {tournament?.endDate}</Typography>
                  <Typography variant="body1"><strong>Max Teams:</strong> {tournament?.maxTeams}</Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={tournament.status === 'true'}
                    onClick={() => {
                      tournament.status === 'false' && tournament.teamMatches.length > 0 ? ManageClickHandler(tournament) : generateClickHandler(tournament)}
                    }
                    sx={{ mt: 2, backgroundColor: 'purple' }}
                  >
                    {tournament.status === 'false'  && tournament.teamMatches.length > 0? 'Manage' : 'Generate Matches'}
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))
        }
      </Grid2> : (
        <Typography variant='h6' sx={{textAlign: 'center', marginTop: '50px'}} color='grey'>You haven't created any tournaments</Typography>)}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: "100%", pr: 5, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          //disabled={tournament ? tournament.status === 'false' : true}
          onClick={createButtonClickHandler}
          sx={{ backgroundColor: 'purple', width: 200, height: 40 }}
        >
          Create Tournament
        </Button>
      </Box>
    </div>
  );
}
