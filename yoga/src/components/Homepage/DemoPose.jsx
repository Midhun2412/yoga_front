import React, { useState, useEffect } from 'react';
import './Demopose.css'
// import { useNavigate } from 'react-router-dom';
const YourComponent = () => {
  const [poseData, setPoseData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const apiUrl = 'http://127.0.0.1:8000/home/userpose/'; 
  let x
  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // if (data && data.length > 0) {
        //   const firstPose = data[0]; 
        //   setPoseData(firstPose);
        //  console.log(firstPose)
        //  x=firstPose.poseName;
        // } else {
        //   console.error('No data found');
        // }

        console.log(data)
      })
      .catch(error => console.error('Error fetching data:', error));

      
  }, [apiUrl]);

   
  useEffect(() => {
      // Call handleSubmit whenever inputData changes
      handleSubmit();
    }, []);
 

  const handleSubmit = async (event) => {
      // event.preventDefault();
    
      // Delay execution by 25ms
      await new Promise(resolve => setTimeout(resolve, 50));
    
      try {
        const response = await fetch('http://127.0.0.1:8000/home/imageview/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ poseName: x }),
      
        })
    
        .then(response => {
          // Check if the response is successful
          if (response.ok) {
            // Convert the response body to blob (binary data)
            return response.blob();
          }
          throw new Error('Network response was not ok.');
        })
        .then(blob => {
          // Convert the blob to a data URL
          const url = URL.createObjectURL(blob);
          // Set the data URL as the image source
          setImageSrc(url);
        })
  
      } catch (error) {
      //   setResponseMessage(`Error: ${error.message}`);
      }

      return () => {
        if (imageSrc) {
          // Revoke the data URL to release resources
          URL.revokeObjectURL(imageSrc);
        }
      };
    }

function handleClick()
{
 window.location.href='/login/home/start';
}
 
  return (
 
 <div className='demo-flex'>
      {poseData && (
        <div className='demopose' id='dp1'>
          <h2>{poseData.poseName}</h2>
          <img src={imageSrc} alt="Tadasana" height={500}  width={500}/> 
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
