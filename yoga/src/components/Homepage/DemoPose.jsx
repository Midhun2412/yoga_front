import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [poseData, setPoseData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const apiUrl = 'http://127.0.0.1:8000/home/userpose/'; // API URL provided

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const firstPose = data[0]; // Assuming there's only one pose data in the response
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

  return (
    <div>
      {poseData && (
        <div>
          <h2>{poseData.poseName}</h2>
          {imageSrc && <img src={imageSrc} alt={poseData.poseName} />}
          <p>{poseData.description}</p>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
