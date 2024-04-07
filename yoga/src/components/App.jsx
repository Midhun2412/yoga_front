import React from "react";
import Land from "./Landing/Land";
import './styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./Authentication/LoginSignup";
import About from "./About";
import WebcamComponent from "./WebcamComponent";
import HomePage from "./Homepage/HomePage";
import Posepage from "./Homepage/Posepage";

import Complete from "./Homepage/Complete";
import Time from "./Extra/Time";

function App() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route index element={<Land />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/login/home/:uid" element={<HomePage />} />
          <Route path="/login/home/pose/:uid/:poseName" element={<Posepage />} />
          <Route path="/login/home/start/:uid/:poseName" element={<WebcamComponent />} />
          <Route path="/complete/:uid" element={<Complete />} />
          <Route path="/time/:uid/:poseName" element={<Time />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
