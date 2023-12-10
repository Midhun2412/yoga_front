// src/components/Signup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = () => {

  let navigate=useNavigate();
function handleClick(){
  console.log("hi there")
  navigate("/login/home");
}

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form>
        <label>
          Email:
          <input type="email" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <label>
          Confirm Password:
          <input type="password" />
        </label>
        <button onClick={handleClick}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
