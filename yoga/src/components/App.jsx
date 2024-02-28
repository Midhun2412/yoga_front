import React from "react";
import Land from "./Landing/Land";
import './styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./LoginSignup";
import Home from "./Home";
import About from "./About";
import WebcamComponent from "./WebcamComponent";
import HomePage from "./Homepage/HomePage";
function App() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route index element={<Land />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/login/home/:uid" element={<HomePage />} />
          <Route path="/login/home/start" element={<WebcamComponent />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
