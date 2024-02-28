import React, { useState, useEffect } from 'react';
import './Demopose.css'
import Tada from './Tadasana.jpg'
// import { useNavigate } from 'react-router-dom';
const YourComponent = () => {

  // let navigate=useNavigate();
  const [poseData, setPoseData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const apiUrl = 'http://127.0.0.1:8000/home/userpose/'; 

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const firstPose = data[0]; 
          setPoseData(firstPose);
          fetch(firstPose.img)
            .then(response => response.blob())
            .then(blob => {
              setImageSrc(URL.createObjectURL(blob));
            })
            .catch(error => console.error('Error fetching image:', error));
        } else {
          console.error('No data found');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [apiUrl]);

function handleClick()
{
 window.location.href='/login/home/start';
}
 
  return (
 
 <div className='demo-flex'>
      {poseData && (
        <div className='demopose' id='dp1'>
          <h2>{poseData.poseName}</h2>
          <img src={Tada} alt="Tadasana" height={500}  width={500}/>
        </div>
      )}
      <div className='demopose' id='dp2'>
      {poseData && (
        <div>
          <p>{poseData.description}</p>
          <button className='next' onClick={handleClick}>START</button>
        </div>
      )}
      </div>
    </div>
  
   
  );
};

export default YourComponent;
