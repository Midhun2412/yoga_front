import React from 'react'
import './first.css';
import { useNavigate } from 'react-router-dom';
const First = () => {
    let navigate=useNavigate();
    function handleButton () {
    console.log("hello");
      navigate('/login');
    };
  return (
    <div className="cta">
      <div>
      <h2>Explore Various<br/> Yoga Poses</h2>
      <h6>Enhance your yoga experience</h6>
    <button className="button-29" onClick={handleButton}>Get Started</button>
    </div>
  </div>
  )
}


export default First
