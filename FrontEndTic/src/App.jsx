//import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//import Users from "./pages/Users.jsx"; // Asegúrate de que la ruta sea correcta
import Home from "./pages/Home.jsx";
import Billboard from "./pages/Billboard.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Billboard />} />
      </Routes>
    </Router>
  );
}

export default App;
