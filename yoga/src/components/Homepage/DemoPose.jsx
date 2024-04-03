import React, { useState, useEffect } from 'react';
import './Demopose.css'
import './Posepage.css'
// import { useNavigate } from 'react-router-dom';
const YourComponent = ({poseName}) => {
  // console.log(poseName)
  const [datas, setDatas] = useState();
  let [poseData, setPoseData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const apiUrl = 'http://127.0.0.1:8000/home/userpose/'; 

  useEffect(() => {
    // Function to fetch data from the backend after a delay
    const fetchDataWithDelay = async () => {
      try {
        // Delay the fetch by 10ms
        setTimeout(async () => {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setDatas(data);
          console.log(datas)
        }, 10);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Call fetchDataWithDelay whenever new data is sent
    fetchDataWithDelay();
  }, [apiUrl]); // Fetch data whenever apiUrl changes
  

   
  useEffect(() => {
      // Call handleSubmit whenever inputData changes
     
      handleSubmit();
    }, []);
 

  const handleSubmit = async (event) => {
      // event.preventDefault();
      
      if (datas && datas.poseName === poseName) {
        console.log("yes")
      }
      // Delay execution by 25ms
      await new Promise(resolve => setTimeout(resolve, 50));
    
      try {
        const response = await fetch('http://127.0.0.1:8000/home/imageview/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ poseName: poseName }),
      
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
