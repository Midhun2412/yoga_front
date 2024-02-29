import React from 'react'
import './feature1.css'
import F1 from './feature1.png'
const Feature1 = () => {
  return (
    <div className='feature1-flex'>
     <div className='f' id='f1'> <img id='img1' src={F1} alt="Tadasana" height={500}  width={500}/></div>
     <div className='f' id='f2'>
    <h2>FEATURE</h2>
    <h1>Easy-touse AI technology</h1>
    <p>From pose guidance to form correction, we offer comprehensive </p>
     </div>
    </div>
  )
}

export default Feature1