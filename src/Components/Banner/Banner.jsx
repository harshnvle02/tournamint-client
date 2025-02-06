import React from 'react'
import './Banner.css'
import myImg from "./sports.png"



const Banner = () => {
  return (
    <div className='banner-div' >
            
         <img src={myImg} className='img-prop'></img> 
         <div className="heading">
         </div>
    </div>
  )
}

export default Banner
