import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Animate from './success.gif';
import './complete.css';

const Complete = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null); // Initialize info state as null

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = '/login/home/' + uid;
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [uid]); // Include uid in the dependency array

  const payload = {
    updatelevel: info?.level + 1, // Access level property of info using optional chaining
    email: uid,
  };

  const LevelUpdate = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/home/levelupdate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error updating level:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true when fetching starts
        const reqData = await fetch('http://127.0.0.1:8000/home/userStatus/' + uid);
        const resData = await reqData.json();
        setInfo(resData);
        await LevelUpdate();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading state to false when fetching completes
      }
    };

    fetchData();
  }, [uid]); // Include uid as a dependency in useEffect

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
