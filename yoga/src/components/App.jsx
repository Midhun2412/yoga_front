import React from "react";
import Land from "./Land";
import './styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./LoginSignup";
import Home from "./Home";
import WebcamCapture from "./WebcamCapture";
function App() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route index element={<Land />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/login/home" element={<Home />} />
          <Route path="/login/home/start" element={<WebcamCapture />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
