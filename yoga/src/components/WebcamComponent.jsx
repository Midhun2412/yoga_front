import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import './WC.css'
const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(true);

  useEffect(() => {
    let intervalId;

    if (isCapturing) {
      intervalId = setInterval(() => {
        captureAndUpload();
      }, 500);
    }

    
    return () => clearInterval(intervalId);
  }, [isCapturing]);

  const captureAndUpload = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      try {
        const blob = await fetch(imageSrc).then((res) => res.blob());

       
        const formData = new FormData();
        formData.append('image', blob, 'captured-image.png');

       
        const response = await fetch('http://127.0.0.1:8000/home/image/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully!');
          
        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const toggleCapture = () => {
    setIsCapturing((prevIsCapturing) => !prevIsCapturing);
  };

  return (
    <div className='webcam-container'>
      <Webcam
        audio={false}
        height={480}
        ref={webcamRef}
        screenshotFormat="image/png" 
        width={640}
      />
      <button onClick={toggleCapture}>
        {isCapturing ? 'Stop Pose' : 'Start Pose'}
      </button>
    </div>
  );
};

export default WebcamComponent;
