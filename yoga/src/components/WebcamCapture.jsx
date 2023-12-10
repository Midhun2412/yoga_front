import React, { useRef } from 'react';
import Webcam from 'react-webcam';
// import './webcam.css'
const WebcamCapture = () => {
  const webcamRef = useRef(null);

  // const capture = () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   console.log(imageSrc);
    
  // };

  return (
    <div>
      <Webcam className='frame'
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      {/* <button onClick={capture}>Capture photo</button> */}
    </div>
  );
};

export default WebcamCapture;
