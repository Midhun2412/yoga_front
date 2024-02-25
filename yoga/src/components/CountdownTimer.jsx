import React, { useState, useEffect } from 'react';


function CountdownTimer(){
 
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(interval);
        // Call your webcam app or any other function here
        console.log('Countdown reached 0. Calling WebcamApp...');
        
      } else {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>{seconds}</p>
    </div>
  );
};

export default CountdownTimer;
