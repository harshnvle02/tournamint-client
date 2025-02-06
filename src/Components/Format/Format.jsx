import React from 'react'
import CardGrid from './CardGrid'
import { Typography } from '@mui/material'

export default function Format(props) {
  const data = props.data;
  return (
    <div className={props.className ? `${props.className} sampleContainer` : 'sampleContainer'} style={{ paddingTop: "40px", height: "30px", width: "100%" }}>
      <div style={{ textAlign: 'center', paddingLeft: "30px" }}>
        <Typography variant='h6' sx={{}}>{data.title}</Typography>
        <div className="Format-desc-container" style={{justifyContent:"center", width:"85%", alignItems:"center", margin:"auto"}}>

          <Typography>{data.description}</Typography>
        </div>
      </div>
      <CardGrid data={data.cardData}/>
    </div>
  )
}
