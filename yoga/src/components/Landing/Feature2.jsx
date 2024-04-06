import React from 'react'
import './feature2.css'
import F1 from './feature2.png'
const Feature2 = () => {
  return (
    <div className='feature2-flex'>
     
     <div className='fe' id='f3'>
     <h2>FEATURE</h2> 
     <h1>Simplicity at its best</h1>
    <h6>Our commitment to simplicity ensures a seamless yoga experience.<br></br> Let our AI technology guide you towards perfecting your poses effortlessly.</h6>
    <button className='button-52'>Learn more</button>
     </div>

     <div className='fe' id='f1'> 

     <div className='imgbox'>
     <img id='img1' src={F1} alt="img failed" />
     </div>
    
     </div>

    </div>
  )
}

export default Feature2