import React from 'react'
import './feature2.css'
import F1 from './feature4.png'
const Feature4 = () => {
  return (
    <div className='feature2-flex'>
     
    <div className='fe' id='f3'>
    <h2>FEATURE</h2> 
    <h1>Explore new poses</h1>
   <h6>Get started with a free demo and unlock the power of YogaAI.</h6>
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

export default Feature4