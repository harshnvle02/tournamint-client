import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

export default function GuideData() {
  const totalData = [
    {
      title: 'Tournament',
      data: {
        title_1: 'Tournament',
        description_1: 'Create single or two stage tournaments for your community, complete with sign-up pages, team roster management, seeding, match chat, and everything you need to get things done.',
        title_2: 'Events',
        description_2: "Running multiple tournaments within one event? Challonge Events have you covered. We'll connect your ticketing & registration to all of your tournaments and give you a hub for holding it all together."
      },
    },
    {
      title: 'Contests',
      data: {
        title_1: 'Bracket Pick-em Contests',
        description_1: "Engage with your audience with bracket predictions! Have people submit their brackets prior to your tournament starting, and we'll keep track of the leaderboard.",
        title_2: 'Voting Contests',
        description_2: "Turn on voting for your tournament to allow anyone with a Challonge account to vote on open matches."
      },
    }
  ]

  const [choice, setChoice] = useState('Tournament');
  const [dataToShow, setDataToShow] = useState(totalData[0]);

  const handleChange = (e) => {
    setChoice(e.target.value);
    setDataToShow(totalData.find(item => item.title === e.target.value));
  }
  return (
    <>

      <div className='guideControls'>
        <FormControl variant='filled' sx={{
          marginTop: '50px'
        }}>
          <InputLabel id="select-label" sx={{
            color: 'white'
          }}>Choice</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={choice}
            onChange={handleChange}
            sx={{
              width: 500,
              backgroundColor: '#fff', // Background color
              color: 'black', // Text color
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff', // Border color
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff', // Border color on hover
              },
              '.MuiSvgIcon-root': {
                color: '#fff', // Dropdown arrow color
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#ec8455', // Menu background color
                  '& .MuiMenuItem-root': {
                    color: '#fff', // Menu item text color
                    '&:hover': {
                      color: 'red', // Menu item hover text color
                      backgroundColor: 'lightgray', // Menu item hover background
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value='Tournament'>Tournaments & Events</MenuItem>
            <MenuItem value='Contests'>Contests</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='guideData'>
        <div className='g-data'>
          <span className='g-title'>{dataToShow.data.title_1}</span>
          <p className='g-description'>{dataToShow.data.description_1}</p>
        </div>
        <div className='g-data'>
          <span className='g-title'>{dataToShow.data.title_2}</span>
          <p className='g-description'>{dataToShow.data.description_2}</p>
        </div>
      </div>
    </>
  )
}
