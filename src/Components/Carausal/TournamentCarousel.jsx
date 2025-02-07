import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const TournamentCarousel = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/Tournaments/carousel`);
        const uniqueTournaments = removeDuplicates(response.data);
        setTournaments(uniqueTournaments);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeDuplicates = (data) => {
    const uniqueIds = new Set();
    return data.filter((tournament) => {
      if (!uniqueIds.has(tournament.tournamentId)) {
        uniqueIds.add(tournament.tournamentId);
        return true;
      }
      return false;
    });
  };

  const chunkData = (data, size) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += size) {
      chunks.push(data.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <Box
      sx={{
        position: "relative",
        top: "600px", 
        padding: 5,
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "220px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : tournaments.length > 0 ? (
        <Carousel
          animation="slide"
          duration={600}
          autoPlay
          interval={2500}
          indicators={true}
          navButtonsAlwaysVisible={tournaments.length > 3}
        >
          {chunkData(tournaments, 3).map((chunk, index) => (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              key={index}
            >
              {chunk.map((tournament) => (
                <Grid item xs={12} sm={4} key={tournament.tournamentId}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: 2,
                      p: 2,
                      backgroundColor: "#fff",
                      height: "220px",
                      margin: "auto",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#1976d2",
                          textAlign: "center",
                        }}
                      >
                        {tournament.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Sport:</strong> {tournament.sportType}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Format:</strong> {tournament.format}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Start Date:</strong>{" "}
                        {new Date(tournament.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>End Date:</strong>{" "}
                        {new Date(tournament.endDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Max Teams:</strong> {tournament.maxTeams}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ))}
        </Carousel>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
            No tournaments available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TournamentCarousel;
