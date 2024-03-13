import React from 'react'
import './feature1.css'
import F1 from './feature1.png'
const Feature3 = () => {
  return (
    <div className='feature1-flex'>
    <div className='f' id='f1'> <img id='img1' src={F1} alt="Tadasana" height={500}  width={500}/></div>
    <div className='f' id='f2'>
   <h2>FEATURE</h2>
   <h1>Easy-to-use AI technology</h1>
   <h6>From pose guidance to form correction, we offer comprehensive <br></br>yoga solutions with cutting-edge AI</h6>
   <button className='bf1'>Learn more</button>
    </div>
   </div>
  )
}

export default Feature3