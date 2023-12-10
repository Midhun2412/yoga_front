import React from 'react'
import Header from './Header'
import Features from './Features'
import CallToAction from './CallToAction'
import Bgvideo from "./media/vland2.mp4"
import './land.css'
function Land(){
  return (
    <div className="App">
      <div className="video-container">
        <video autoPlay muted loop className="video-bg">
          <source src={Bgvideo} type="video/mp4" />
        </video>
        <div className="content">
          {/* <Header /> */}
          {/* <Features /> */}
          <CallToAction />
        </div>
      </div>
    </div>
  )
}

export default Land;