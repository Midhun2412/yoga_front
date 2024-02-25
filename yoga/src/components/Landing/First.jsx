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
    <h2>Explore Various<br/> Yoga Poses</h2>
    <p>Enhane your yoga experience</p>
    <button className="button-49" onClick={handleButton}>Get Started</button>
  </div>
  )
}

export default First