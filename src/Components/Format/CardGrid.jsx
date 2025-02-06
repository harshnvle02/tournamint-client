import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Grid2 } from "@mui/material";


const CardGrid = (props) => {

  const cardData = props.data;
  const learnMoreClickHandler = (card) => {
    alert(card.title);
  }
  return (
    <Grid2 container spacing={3} sx={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
      {cardData.map((card, index) => (
        <Grid2 item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 500, minWidth: 400 }}>
            <CardMedia
              component="img"
              height="160"
              image={card.image}
              alt={card.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
           <CardActions>
              <Button size="small" onClick={() => {
                learnMoreClickHandler(card);
              }}>Learn More</Button>
           </CardActions>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default CardGrid;
