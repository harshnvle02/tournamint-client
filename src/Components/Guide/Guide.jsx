import React, { useState } from 'react'
import './Guide.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import GuideData from './GuideData';
export default function Guide() {
  
  return (
    <div className='guideContainer'>
      <h1 className='titleGuide'>Heres how it works</h1>
      <div className='guideDescription'>
        Your GameHost Community is the hub for all your tournaments and events. You can have multiple communities for each one of your competitive interests and freely move tournaments and events between them.
      </div>
      <GuideData />
    </div>
  )
}
