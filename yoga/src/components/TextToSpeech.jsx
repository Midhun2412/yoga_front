import React, { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  useEffect(() => {
    // Fetch text from backend API when component mounts
    fetchTextFromBackend();
  }, []);

  useEffect(() => {
    if (text && text.length > 0) {
      speakText(); // Speak text whenever text state is updated
    }
  }, [text]); // Watch for changes in the text state

  const fetchTextFromBackend = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/home/correction/');
      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        if (data && data.length > 0) {
          setText(data[0].ctext); // Set text state to "Success"
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

  return (
    <div>
      {/* <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to speech"
      /> */}
      {/* <button onClick={speakText} disabled={!text || speaking}>
        {speaking ? 'Speaking...' : 'Speak'}
      </button> */}
    </div>
  );
};

export default TextToSpeech;
