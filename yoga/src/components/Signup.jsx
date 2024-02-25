
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [dob, setDob] = useState('');
  let navigate = useNavigate();
  function handleClick() {


    const endpoint = 'http://127.0.0.1:8000/home/signup/'
    if (password === cpassword) {
      const payload = {
        signupname: name,
        signuppassword: password,
        signupdob: dob,
        signupemail: email
      }
      console.log(payload);

      fetch(endpoint,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
          if(data==="SUCCESS")
          {
            const uid=email;  
           navigate('/login/home');
          }
          else{
              window.alert("Your Already Exist")
          }
         
        })
    }
    else {
      window.alert("Password doesn't match");
    }
  }
  return (
    <div className="form-container">
      <h2>SignUp</h2>

      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        DOB:
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
      </label>
      <button onClick={handleClick}>SignUp</button>

    </div>
  );
};

export default Signup;
