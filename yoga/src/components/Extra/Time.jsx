import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './Timer.css';
function Counter() {

  const {uid} =useParams();
  console.log(uid);
  const {poseName} =useParams();

    const [count, setCount] = useState(3); // Initial count value
    const [showFinal, setShowFinal] = useState(false);
    const navigate = 0 // Initialize useNavigate
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (count > 0) {
          setCount(count - 1);
        } else {
          setShowFinal(true);
          clearInterval(interval);
          if (showFinal) {
            window.location.href = '/login/home/start/'+uid+'/'+poseName;
          //   navigate('/anotherpage'); 
          console.log(navigate)
          }
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [count, navigate, showFinal]);
  
    return (
      <div className="counter">
        {/* Render count only if it's greater than 0 */}
        {count > 0 && (
          <div>
            <span className={count === 0 ? 'in' : ''}>{count}</span>
          </div>
        )}
        {!showFinal && count > 0 && <h4>Get Ready</h4>}
        {showFinal && (
          <div>
            <h1>GO</h1>
          </div>
        )}
      </div>
    );
  }

function Time(){
  return (
    <div className="Timer">
      <Counter />
    </div>
  )
}

export default Time