import { Paper, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import './Carausal.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import image1 from './1.jpg';
import image2 from './2.jpg';
import image3 from './3.jpg';
import image4 from './4.jpg';


export default function Carausal() {
  const [sport, setSport] = useState("hockey");
  useEffect(() => {
    const interval = setInterval(() => {
      setSport((prevSport) => {
        // Cycle through sports
        switch (prevSport) {
          case "Hockey":
            return "Cricket";
          case "Cricket":
            return "Football";
          case "Vollyball":
            return "Tennis";
          case "Tennis":
            return "Hockey";
          default:
            return "Tennis";
        }
      });
    }, 3000); // Change sport every 3 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const imageList = [
    image1,
    image2,
    image3,
    image4
  ];

  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{ height: "100vh", alignItems: "center" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{textAlign:"left"}}>
          <pre>Plan your <span className="changingText">{sport} </span> tournament 
          with <span className="changingText">GameHost</span></pre>
          </Typography>
          <Typography variant="body1" style={{ textAlign:"center" }}>
          Millions of people around the world trust Challonge to manage their tournaments, host their events, and keep their competitive communities organized, informed, and playing together. Take on the GameHost challenge, and game on!<br></br>

            
      
{/*     
      <CheckCircleIcon sx={{ color: "purple", marginRight: "8px", marginTop: "10px" }} /><span className="tick-text">Quick and easy match scheduler</span><br />
      
    
      <CheckCircleIcon sx={{ color: "purple", marginRight: "8px" }} /><span className="tick-text">
      Beautiful live presentation
    </span><br />
    
      <CheckCircleIcon sx={{ color: "purple", marginRight: "8px" }} /><span className="tick-text">
      Online registration page
    </span> */}
  
          <Button color="black" sx={{marginTop:"20px", bgcolor:"purple", color:"white", borderRadius:"10px", padding:"5px 15px"}}>Signup</Button>
          </Typography>
        </Grid>
        {/* Left Section - Carousel */}
        <Grid item xs={12} md={6}>
          <Carousel
            autoPlay={true}
            animation="fade"
            stopAutoPlayOnHover={true}
          >
            {imageList.map((item, index) => (
              <Paper key={index} style={{ transform: "rotate(0deg)", boxShadow:"0px 0px 0px 0px"}}>
                <img
                  style={{
                    width: "110%",
                    height: "118%",
                    borderRadius: "8px",
                    backgroundSize: "cover",
                    objectFit: "cover",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 100px 100%)",
                  }}
                  src={item}
                  alt={`carousel-image-${index}`}
                />
              </Paper>
            ))}
          </Carousel>
        </Grid>

        {/* Right Section - Typography */}
        
      </Grid>
    </div>
  );
}
