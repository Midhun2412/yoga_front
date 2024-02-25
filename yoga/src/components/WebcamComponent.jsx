import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      captureAndUpload();
    }, 500);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const captureAndUpload = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      try {
        const blob = await fetch(imageSrc).then((res) => res.blob());

        // Create a FormData object
        const formData = new FormData();
        formData.append('image', blob, 'captured-image.png');

        // Replace 'your-backend-endpoint' with the actual endpoint URL
        const response = await fetch('http://127.0.0.1:8000/home/image/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully!');
          // You can handle the successful upload here
        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={480}
        ref={webcamRef}
        screenshotFormat="image/png"  // Set the screenshot format to PNG
        width={640}
      />
    </div>
  );
};

export default WebcamComponent;
