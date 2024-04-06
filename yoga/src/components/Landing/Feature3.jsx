import React from 'react'
import './feature1.css'
import F1 from './feature3.png'
const Feature3 = () => {
  return (
    <div className='feature1-flex'>
    <div className='f' id='f1'> 

    <div className='imgbox'>
    <img id='img1' src={F1} alt="img failed" />
    </div>
   
    </div>
    <div className='f' id='f2'>
     <h2>FEATURE</h2>
    <h1>Tailored solutions for all levels</h1>
   <h6>Whether you're a beginner or an advanced yogi, our AI-powered platform customizes<br></br> yoga poses to suit your individual practice. Experience yoga like never before.</h6>
   <button className='button-52'>Learn more</button>
    </div>
   </div>
  )
}

export default Feature3