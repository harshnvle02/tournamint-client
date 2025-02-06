import { Box, Button, Card, CardContent, Grid2, Typography } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthConntext';
import { baseUrl } from '../baseUrl';

const Participate = () => {
  const { user } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/Tournaments/participate/${user.userId}`);
        setTournaments(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const participateClickHandler = (tournament) => {
    navigate("/addtournament/addEntry", { state: { tournament } });
  };

  return (

    tournaments.length > 0 ? (
      <Grid2 container spacing={3} justifyContent="center" sx={{ width: "85vw", marginTop: '20px', marginRight: "auto", marginLeft: 'auto' }}>
        {tournaments.map(tournament => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={tournament.tournamentId}>
            <Card
              key={tournament.tournamentId}
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "200px", // Fixed height to maintain layout
                Width: "300px",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center" }}>
                  {tournament.name}
                </Typography>
                <Typography variant="body2"><strong>Sport:</strong> {tournament.sportType}</Typography>
                <Typography variant="body2"><strong>Format:</strong> {tournament.format}</Typography>
                <Typography variant="body2"><strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}</Typography>
                <Typography variant="body2"><strong>End Date:</strong> {new Date(tournament.endDate).toLocaleDateString()}</Typography>
                <Typography variant="body2"><strong>Max Teams:</strong> {tournament.maxTeams}</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                  <Button
                    variant="contained"
                    disabled={tournament.status === 'true'}
                    color='secondary'
                    onClick={() => participateClickHandler(tournament)}
                  >
                    {tournament.status === 'true' ? 'Tournament Ended' : 'Participate'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
          No tournaments available
        </Typography>
      </Box>
    )

  );
};

export default Participate;
