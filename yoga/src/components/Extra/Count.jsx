import React, { useState, useEffect } from 'react';
import './Timer.css';

function Counter() {
  const [count, setCount] = useState(3); // Initial count value
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        setShowFinal(true);
        clearInterval(interval);
        if (showFinal) {
          // Navigate to another page after reaching "GO"
        //   navigate('/anotherpage'); 
      
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [count, showFinal]);

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

function Timer() {
  return (
    <div className="Timer">
      hi
      <Counter />
    </div>
  );
}

export default Timer;
