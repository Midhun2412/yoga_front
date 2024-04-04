import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './WC.css';
import { useParams } from 'react-router-dom';

const WebcamComponent = () => {
  const { poseName } = useParams();
  console.log(poseName);

  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const captureAndUpload = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      try {
        const blob = await fetch(imageSrc).then((res) => res.blob());

        // Upload image and poseName
        const formData = new FormData();
        formData.append('image', blob, 'captured-image.png');
        formData.append('modelname', poseName);

        const response = await fetch('http://127.0.0.1:8000/home/image/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Image and poseName uploaded successfully!');
        } else {
          console.error('Failed to upload image and poseName');
        }
      } catch (error) {
        console.error('Error uploading image and poseName:', error);
      }
    }
  };

  const toggleCapture = () => {
    if (!isCapturing) {
      setIsCapturing(true);
      captureAndUpload(); // Capture and upload the image immediately
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
        {isCapturing ? 'Capturing...' : 'Capture Image'}
      </button>
    </div>
  );
};

export default WebcamComponent;