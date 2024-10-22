import Home from "./Home.jsx";
import MovieCard from "../components/MovieCard.jsx";
import "../styles/Billboard.css";
import React, { useState } from "react";

function Billboard() {
  const [selectedButton, setSelectedButton] = useState(null);

  // Función para manejar la selección de un botón
  const handleSelect = (buttonIndex) => {
    setSelectedButton(buttonIndex); // Cambia el botón seleccionado
  };
  const menu = (
    <div className="nav-buttons">
      <button
        className={selectedButton === 1 ? "selected" : ""}
        onClick={() => handleSelect(1)}
      >
        Cine 1
      </button>

      <button
        className={selectedButton === 2 ? "selected" : ""}
        onClick={() => handleSelect(2)}
      >
        Cine 2
      </button>

      <button
        className={selectedButton === 3 ? "selected" : ""}
        onClick={() => handleSelect(3)}
      >
        Cine 3
      </button>
    </div>
  );

  const content = (
    <>
      <h2>Contenido Principal</h2>
      <p>
        Aquí va el contenido principal de tu página. Puedes agregar más
        secciones, imágenes, formularios o cualquier otro elemento que
        necesites.
      </p>
      <MovieCard> </MovieCard>
    </>
  );

  return <Home menuContent={menu} pageContent={content} />;
}

export default Billboard;
