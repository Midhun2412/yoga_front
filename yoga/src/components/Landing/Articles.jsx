import React from 'react'
import './Article.css'
import A1 from './article1.jpg'
import A2 from './article2.jpg'
import A3 from './article3.jpeg'
export const Articles = () => {
  return (
    
    
    <div className='articleflex'>
        
   
        <div className='box' id='box1'>
        <div className='artibox'>
        <img id='img2' src={A1} alt="img failed" />
        </div>
          Achieving mindfulness through yoga<br></br><br></br>
          Discover the art of mindfulness through yoga practice and unlock inner peace and tranquility.<br></br><br></br>
          <h6>Samantha White</h6>
        </div>
        <div className='box' id='box2'>
        <div className='artibox'>
        <img id='img2' src={A2} alt="img failed" />
        </div>
        Innovate your yoga routine<br></br><br></br>
        Innovation plays a vital role in evolving your yoga practice. Embrace new techniques and approaches to elevate your yoga journey.<br></br><br></br>
        <h6>David Green</h6>
        </div>
        <div className='box' id='box3'>
        <div className='artibox'>
        <img id='img2' src={A3} alt="img failed" />
        </div>
        Balance work and yoga<br></br><br></br>
        Discover harmony between work and yoga practice to lead a fulfilling and balanced lifestyle.<br></br><br></br>
       <h6> Emily Brown</h6>
       
        </div>    
    </div>
  )
}