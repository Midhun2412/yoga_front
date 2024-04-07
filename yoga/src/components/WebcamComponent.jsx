import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './WC.css';
import { useParams } from 'react-router-dom';
import TextToSpeech from './TextToSpeech'; // Import the TextToSpeech component

const WebcamComponent = () => {
  const { poseName } = useParams();
  const { uid } = useParams();
  console.log(poseName);

  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [del, setDel] = useState(false)
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [res, setRes] = useState();
  const synth = window.speechSynthesis;

  useEffect(() => {
    
    const redirectTimer = setTimeout(() => {
      if(res===0)
      {
       window.location.href = '/complete/'+uid;
      }
      
    else{
      window.location.href = '/login/home/start/'+uid+'/'+poseName;
    }
      
    }, 12000); 

    return () => clearTimeout(redirectTimer); 
  }, [res]);
  

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 4) {
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
      fetchTextFromBackend();
    }
  }, [imageUploaded]);

  useEffect(() => {
    if (text && text.length > 0) {
      speakText(); // Speak text whenever text state is updated
    }
  }, [text]); // Watch for changes in the text state

  useEffect(() => {
    // Make API call when del is true
    if (del) {
      deleteImage();
    }
  }, [del]);

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

  const fetchTextFromBackend = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/home/correction/');
      if (response.ok) {
        setDel(true);
        const data = await response.json(); 
        if (data && data.length > 0) {
          
          const ctext = data[0].ctext;
          const newText = ctext.replace(/[\s.]+/g, ' ');
          setText(newText); 
          setRes(data[0].res);
        } else {
          console.error('Unexpected response data:', data);
        }
      } else {
        console.error('Failed to fetch text from backend');
      }
    } catch (error) {
      console.error('Error fetching text from backend:', error);
    }
  };

  const speakText = () => {
    if (synth.speaking) {
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
    setSpeaking(true);
    
    utterance.onend = () => {
      setSpeaking(false);
    };
  };

  const deleteImage = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/home/imgdelete/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const responseData = await response.json();
      console.log("deletion request successfull");
    } catch (error) {
      console.error('Error posting message', error);
    }
  };

  
  return (
    <div className="webcam-container">
      <Webcam className='webcam'
        style={{ transform: 'scaleX(-1)',
                 width: '110vh',
                 height: '110vh',
                 }}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
      />
      {isRecording && (
        <div className="countdown-timer">
         <p>Time remaining: {timeRemaining} seconds</p> 
        </div>
      )}

{!isRecording && text && <p>Correction: <br/> {text}</p>}
    </div>
  );
};

export default WebcamComponent;
