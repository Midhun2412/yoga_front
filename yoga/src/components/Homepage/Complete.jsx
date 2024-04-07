import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Animate from './success.gif';
import './complete.css';

const Complete = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null); // Initialize info state as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true when fetching starts
        const reqData = await fetch('http://127.0.0.1:8000/home/userStatus/' + uid);
        const resData = await reqData.json();
        setInfo(resData);
        setLoading(false); // Set loading state to false when fetching completes
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Ensure loading state is set to false on error
      }
    };

    fetchData();
  }, [uid]); // Include uid as a dependency in useEffect

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = '/login/home/' + uid;
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [uid]); 

  const payload = {
    updatelevel: info && info.level ? info.level + 1 : 1, // If info and info.level exist, increment info.level by 1, otherwise set updatelevel to 1
    email: uid,
  };

  const LevelUpdate = async () => {
    try {
      console.log(payload);
      const response = await fetch('http://127.0.0.1:8000/home/levelupdate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        
      });
      console.log(info);
      const responseData = await response.json();
    } catch (error) {
      console.error('Error updating level:', error);
    }
  };

  useEffect(() => {
    if (info) {
      LevelUpdate(); // Call LevelUpdate only if info is truthy
    }
  }, [info]); // Include info as a dependency in useEffect

  return (
    <div className="animate">
      {loading ? (
        <img className="loading-image" src="success.gif" alt="Loading" />
      ) : (
        <img className="loading-image" src={Animate} alt="Success" />
      )}
    </div>
  );
};

export default Complete;
