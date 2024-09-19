import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import Home from "./page/Home";
import Loading from "./page/Loading";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Loading />} />
      </Routes>
    </Router>
  );
}

export default App;
