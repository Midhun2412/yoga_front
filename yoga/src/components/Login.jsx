// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {


let navigate=useNavigate();
function handleClick(){
  console.log("hi there")
  navigate("/login/home");
}
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="email" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <button onClick={handleClick}>Login</button>
      </form>
    </div>
  );
};

export default Login;
