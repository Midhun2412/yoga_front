import React from 'react'
import { useNavigate } from 'react-router-dom';
function CallToAction() {

  let navigate=useNavigate();
  function handleButton () {
  console.log("hello");
    navigate('/login');
  };

  return (
    <div className="cta">
    <h2>Start Your Yoga Journey Today</h2>
    <p>Experience the power of AI in enhancing your yoga practice.</p>
    <button className="button-49" onClick={handleButton}>Get Started</button>
  </div>
  )
}

export default CallToAction;