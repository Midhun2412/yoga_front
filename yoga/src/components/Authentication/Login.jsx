
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [payload, setPayload] = useState()
  let navigate=useNavigate();
  function handleClick() {
    const endpoint = 'http://127.0.0.1:8000/home/login/';
    
    const payload = {
      useremail: email,
      userpassword: password
    };
    
    console.log(payload);
    
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      if (data === "SUCCESS") {
        const uid = email;
        navigate('/login/home/'+uid);
        // navigate('/complete');
        console.log("success");
      } else {
        window.alert("Please check your login");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  return (
    <div className="form-container">
      <h2 className='loglabel'>Welcome Back!</h2>
      
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button onClick={handleClick}>Login</button>
      
    </div>
  );
};

export default Login;
