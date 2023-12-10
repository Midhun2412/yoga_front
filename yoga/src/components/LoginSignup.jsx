// src/components/LoginSignup.js
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './login.css';
const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-signup-container">
      {isLogin ? <Login /> : <Signup />}
      <p onClick={toggleForm}>
        {isLogin ? 'Don\'t have an account? Sign up here.' : 'Already have an account? Login here.'}
      </p>
    </div>
  );
};

export default LoginSignup;
