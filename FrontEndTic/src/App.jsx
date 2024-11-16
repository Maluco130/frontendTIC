//import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//import Users from "./pages/Users.jsx"; // Asegúrate de que la ruta sea correcta
import Home from "./pages/Home.jsx";
import Billboard from "./pages/Billboard.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx"; // Asegúrate de que la ruta sea correcta
import "./index.css";
import MovieDetails from "./pages/MovieDetails";
import Header from "./components/Header";
import Seats from "./pages/Seats.jsx";
import Reservas from "./pages/Reservas.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Billboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:slug" element={<MovieDetails />} />
        <Route path="/Seats" element={<Seats />} />
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
    </Router>
  );
}

export default App;
