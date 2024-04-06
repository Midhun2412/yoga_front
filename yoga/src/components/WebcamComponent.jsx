import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './WC.css';
import { useParams } from 'react-router-dom';
import TextToSpeech from './TextToSpeech';

const WebcamComponent = () => {
  const { poseName } = useParams();
  console.log(poseName);

  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(20); 
  const [status,setStatus] = useState()

  const captureAndUpload = async () => {
    if (webcamRef.current) {
      const video = webcamRef.current.video;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the video onto the canvas, flipped horizontally
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a data URL
      const imageSrc = canvas.toDataURL('image/png');

      // Upload image and poseName
      try {
        const blob = await fetch(imageSrc).then((res) => res.blob());

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRecording(true); // Set isRecording to true to indicate recording
      captureAndUpload(); // Capture and upload the image every 15 seconds

      // Update time remaining
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval); // Stop the interval when time is up
          setIsRecording(false); // Reset isRecording to false
          return 15; // Reset time remaining to initial value
        } else {
          return prevTime - 1; // Decrement time remaining
        }
      });
    }, 1000); // Update time every second

    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, []);

  return (
    <div className="webcam-container">
      <Webcam
        style={{ transform: 'scaleX(-1)' }}
        audio={false}
        height={480}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={640}
      />
      {isRecording && (
        <div className="countdown-timer">
          Time remaining: {timeRemaining} seconds
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
