import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './WC.css';
import { useParams } from 'react-router-dom';
import TextToSpeech from './TextToSpeech'; // Import the TextToSpeech component

const WebcamComponent = () => {
  const { poseName } = useParams();
  console.log(poseName);

  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [textToSpeechVisible, setTextToSpeechVisible] = useState(false); // State to track whether TextToSpeech should be visible

  const captureAndUpload = async () => {
    if (webcamRef.current && !imageUploaded) {
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
          setImageUploaded(true);
        } else {
          console.error('Failed to upload image and poseName');
        }
      } catch (error) {
        console.error('Error uploading image and poseName:', error);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if(prevTime === 4)
        {
          captureAndUpload(); // Capture and upload the image
        }
        if (prevTime === 0) {
          clearInterval(timer); // Stop the interval when time is up
          setIsRecording(false); // Set isRecording to false
         
        }
        return prevTime - 1; // Decrement time remaining
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    // Show TextToSpeech component after the image is uploaded
    if (imageUploaded) {
      setTextToSpeechVisible(true);
    }
  }, [imageUploaded]);

  if(textToSpeechVisible==="true")
  {
    TextToSpeech()
  }

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
      {imageUploaded && <p>Image uploaded successfully!</p>}
      
    </div>
  );
};

export default WebcamComponent;
