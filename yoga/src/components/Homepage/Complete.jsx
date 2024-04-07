import React, { useState, useEffect } from 'react';
import Animate from './success.gif';
import './complete.css';
const Complete = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const LevelUpdate = async () => {
    try {
      const response = await fetch('https://api1.example.com/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error posting data to API 1:', error);
    }
  };

  const IndexUpdate = async () => {
    try {
      const response = await fetch('https://api2.example.com/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error posting data to API 2:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true when fetching starts
      await LevelUpdate();
      await IndexUpdate();
      setLoading(false); // Set loading state to false when fetching completes
    };

    fetchData();
  }, []); 

  return (
    <div className="animate">
    {loading ? (
      <img className="loading-image" src="success.gif" alt="Loading" />
    ) : (
      // <div>Complete</div>
      <img className="loading-image" src={Animate} alt="Loading" />
    )}
  </div>
  );
};

export default Complete;
