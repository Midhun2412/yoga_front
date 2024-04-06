import React, { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  useEffect(() => {
    // Fetch text from backend API when component mounts
    fetchTextFromBackend();
  }, []);

  const fetchTextFromBackend = async () => {
    try {
      const response = await fetch('your-backend-api-url');
      const data = await response.json();
      setText(data.text); // Assuming your backend returns an object with 'text' property
      speakText(data.text); // Automatically speak the received text
    } catch (error) {
      console.error('Error fetching text from backend:', error);
    }
  };

  const speakText = (textToSpeak) => {
    if (synth.speaking) {
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    synth.speak(utterance);
    setSpeaking(true);
    
    utterance.onend = () => {
      setSpeaking(false);
    };
  };
};

export default TextToSpeech;
