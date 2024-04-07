import React, { useState, useEffect } from 'react';
import './Demopose.css'
import './Posepage.css'

const YourComponent = ({ poseName, uid }) => {


  const [datas, setDatas] = useState([]);
  const [poseData, setPoseData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const apiUrl = 'http://127.0.0.1:8000/home/userpose/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setDatas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    datas.forEach(data => {
      if (data.poseName === poseName) {
        setPoseData(data);
        console.log(poseData);
      }
    });
  }, [datas, poseName]);

  const handleSubmit = async () => {
    if (!poseData) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/home/imageview/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ poseName: poseName }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [poseData, poseName]);

  const handleClick = () => {
    window.location.href = '/time/'+uid+'/'+poseName;
  
  };

  return (
    <div className='demo-flex'>
      {poseData && (
        <div className='demopose' id='dp1'>
          <h2>{poseData.poseName}</h2>
          <img src={imageSrc} alt="Tadasana" height={500} width={500} />
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
