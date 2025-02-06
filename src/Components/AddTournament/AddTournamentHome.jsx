import React from 'react'
import { Box, Typography } from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthConntext'

const AddTournamentHome = () => {
  return (
    <div>
      <Box
          sx={{
            position: "absolute", // Fix Typography in place
            top: "50%", // Center vertically
            left: "50%", // Center horizontally
            transform: "translate(-50%, -50%)", // Center both vertically and horizontally
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              fontFamily: "Montserrat, Arial, sans-serif",
            }}
          >
            To Add Your Tournament
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Arial, sans-serif",
              color: "#555",
            }}
          >
            Navigate to <b>Menu &rarr; Add Tournament</b> and click on "Add Tournament".
          </Typography>
        </Box>
    </div>
  )
}

export default AddTournamentHome
