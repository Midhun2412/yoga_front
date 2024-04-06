import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './HomePage.css';
import Posepage from './Posepage';

function HomePage() {
  const [difficulty, setDifficulty] = useState(1);
  const { uid } = useParams();
  console.log(uid);

  const [user, setUser] = useState({ signupname: "", signuppassword: "", signupdob: "", signupemail: "" });
  const [poseData, setPoseData] = useState(null);
  const [selectedPose, setSelectedPose] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const reqData = await fetch('http://127.0.0.1:8000/home/userDetails/' + uid);
      const resData = await reqData.json();
      setUser(resData);
    };
    getUser();


    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/home/userpose/');
        const data = await response.json();
        setPoseData(data);
      } catch (error) {
        console.error('Error fetching poseData:', error);
      }
    };
    fetchData();
  }, [uid]);

  function handleClick(x) {
    setDifficulty(x);
  }

  function handlePose(poseName) {
    setSelectedPose(poseName);
    window.location.href = '/login/home/pose/' + uid + '/' + poseName;
  }

  // Filter by difficulty
  const filteredDiff = poseData ? poseData.filter(item => item.index_no === difficulty) : [];
  console.log(filteredDiff);

  useEffect(() => {
    // JavaScript logic to handle button sizing
    const buttons = document.querySelectorAll('.Namebox button');
    let maxWidth = 0;

    buttons.forEach(button => {
      maxWidth = Math.max(maxWidth, button.offsetWidth);
    });

    buttons.forEach(button => {
      button.style.width = maxWidth + 'px';
    });
  }, [filteredDiff]);

  return (
    <div className='Homepage'>
      <div className='Homebox'>
        <div className='tooltip'>
          <button className='Homebutton' onClick={() => handleClick(1)}>Easy</button><br></br>
          <span className='tooltiptext'>Provides Easy mode of yoga poses</span>
        </div>
        
        <div className='tooltip'>
          <button className='Homebutton' onClick={() => handleClick(2)}>Intermediate</button>
          <span className='tooltiptext'>Provides Intermediate mode of yoga poses</span>
        </div>

        <div className='tooltip'>
          <button className='Homebutton' onClick={() => handleClick(3)}>Advanced</button>
          <span className='tooltiptext'>Provides Advanced mode of yoga poses</span>
        </div>
      </div>
      <div className='Namebox'>
        {filteredDiff && filteredDiff.map((image, index) => (
          <button key={index} onClick={() => handlePose(image.poseName)}>{image.poseName}</button>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
