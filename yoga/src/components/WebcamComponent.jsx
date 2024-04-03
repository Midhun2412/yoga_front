import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import './WC.css';
import { useParams } from 'react-router-dom';

const WebcamComponent = () => {
  const { poseName } = useParams();
  console.log(poseName);

  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(true);

  useEffect(() => {
    let intervalId;

    if (isCapturing) {
      intervalId = setInterval(() => {
        captureAndUpload();
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [isCapturing]);

  const captureAndUpload = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      try {
        const blob = await fetch(imageSrc).then((res) => res.blob());

        // Upload image
        const imageFormData = new FormData();
        imageFormData.append('image', blob, 'captured-image.png');
        const imageResponse = await fetch('http://127.0.0.1:8000/home/image/', {
          method: 'POST',
          body: imageFormData,
        });
        if (!imageResponse.ok) {
          console.error('Failed to upload image');
          return;
        }

        console.log('Image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const stopCaptureAndSendSignal = async () => {
    setIsCapturing(false);
    
    try {
      // Send signal to backend when image capturing is stopped
      const stopSignalResponse = await fetch('http://127.0.0.1:8000/stopSignalEndpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signal: 'yes' }),
      });
      if (!stopSignalResponse.ok) {
        console.error('Failed to send stop signal to backend');
      } else {
        console.log('Stop signal sent to backend successfully!');
      }
    } catch (error) {
      console.error('Error sending stop signal to backend:', error);
    }
  };

  const toggleCapture = () => {
    if (isCapturing) {
      stopCaptureAndSendSignal();
    } else {
      setIsCapturing(true);
    }
  };

  return (
    <div className="webcam-container">
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
