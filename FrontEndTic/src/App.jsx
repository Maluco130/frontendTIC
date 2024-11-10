//import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//import Users from "./pages/Users.jsx"; // Asegúrate de que la ruta sea correcta
import Home from "./pages/Home.jsx";
import Billboard from "./pages/Billboard.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx"; // Asegúrate de que la ruta sea correcta
import Seats from "./pages/Seats.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Billboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seats" element={<Seats />} />
      </Routes>
    </Router>
  );
}

export default App;
