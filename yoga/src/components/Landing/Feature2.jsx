import React from 'react'
import './feature2.css'
import F1 from './feature1.png'
const Feature2 = () => {
  return (
    <div className='feature2-flex'>
     
     <div className='fe' id='f3'>
     <h1>Easy-to-use AI technology</h1>
    <h6>From pose guidance to form correction, we offer comprehensive <br></br>yoga solutions with cutting-edge AI</h6>
    <button className='bf1'>Learn more</button>
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