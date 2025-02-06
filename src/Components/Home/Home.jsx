import React from 'react'
import Sample from '../Sample/Sample'
import Format from '../Format/Format'
import Guide from '../Guide/Guide'
import './Home.css'
import { formatData } from '../data'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import TournamentCarousel from '../Carausal/TournamentCarousel'

export default function Home() {
  return (
    <div className='home-container'>
      <Navbar/>
      <Sample />
      <Format data={formatData[0]} />
      <Guide />
      <TournamentCarousel/>
      <Footer />
    </div>
  )
}
