//import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//import Users from "./pages/Users.jsx"; // Asegúrate de que la ruta sea correcta
import Home from "./pages/Home.jsx";
import Billboard from "./pages/Billboard.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx"; // Asegúrate de que la ruta sea correcta
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Billboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
