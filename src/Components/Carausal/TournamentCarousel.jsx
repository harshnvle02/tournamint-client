import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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


  // Function to remove duplicate tournaments based on tournamentId
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


  const settings = {
    dots: true,
    infinite: tournaments.length > 3, // Only infinite if we have more than 3 tournaments
    speed: 600,
    slidesToShow: Math.min(3, tournaments.length), // Show only available tournaments
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: Math.min(2, tournaments.length),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (
    <Box
      sx={{
        position: "relative",
        top: "550px",
        padding: 3,
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "220px" }}>
          <CircularProgress />
        </Box>
      ) : tournaments.length > 0 ? (
        <Slider {...settings}>
          {tournaments.map((tournament) => (
            <Box key={tournament.tournamentId} sx={{ px: 2 }}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                  height: "220px",
                  maxWidth: "300px",
                  margin: "auto",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center" }}>
                    {tournament.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Sport:</strong> {tournament.sportType}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Format:</strong> {tournament.format}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>End Date:</strong> {new Date(tournament.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Max Teams:</strong> {tournament.maxTeams}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
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



