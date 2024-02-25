import React from 'react'
import Nav from './Nav'
// import Bgvideo from "./media/vland2.mp4"
import './land.css'
import First from './First'


import { Articles } from './Articles'
import Feedback from './Feedback'
import Footer from './Footer'
import Feature1 from './Feature1'
function Land(){
  return (
    <div className="App">
      <Nav />
      <div className="video-container">
        {/* <video autoPlay muted loop className="video-bg">
          <source src={Bgvideo} type="video/mp4" />
        </video> */}
        <div className="container">
          <section className='lframe'>
            <First />
          </section>
          <section className='feature1'>
            <Feature1 />
          </section>
          <section className='feature2'>
            Feature 2
          </section>
          <section className='feature3'>
            Feature 3
          </section>
          <section className='feature4'>
            Feature 4
          </section>
          <section className='articles'>
          <h3>Read our latest articles</h3>
        <p>Stay informed and inspierd with our curated yoga content</p><br/>
            <Articles />
          </section>
          <section className='feedback'>
           <h2>Feedback from our valuable users</h2>
           <p>Join thousands of yogis worldwide benefitting from Matyogi.Discover their experiences</p><br/>
          <Feedback />
          </section>
          <section className='footer'>
            <Footer />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Land;