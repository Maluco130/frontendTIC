import Home from "./Home.jsx";
import "../styles/Seats.css";
import { useState } from "react";
 
const generarAsientos = () => {
  const asientos = [];
  const filas = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O  ",
  ];
 
  filas.forEach((fila, filaIndex) => {
    for (let i = 1; i <= 10; i++) {
      asientos.push({
        id: filaIndex * 10 + i,
        fila,
        numero: i,
        estado: Math.random() > 0.8 ? "ocupado" : "disponible",
      });
    }
  });
 
  return asientos;
};
 
function Seats() {
  const [asientos, setAsientos] = useState(generarAsientos());
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
 
  const [selectedButton, setSelectedButton] = useState(null);
 
  // Función para manejar la selección de un botón
  const handleSelect = (buttonIndex) => {
    setSelectedButton(buttonIndex); // Cambia el botón seleccionado
  };
 
  const seleccionarAsiento = (asiento) => {
    if (asiento.estado === "ocupado") return;
 
    const nuevosAsientos = asientos.map((a) =>
      a.id === asiento.id
        ? {
            ...a,
            estado: a.estado === "seleccionado" ? "disponible" : "seleccionado",
          }
        : a
    );
 
    setAsientos(nuevosAsientos);
    setAsientosSeleccionados(
      nuevosAsientos.filter((a) => a.estado === "seleccionado")
    );
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
    <div className="container">
      <div className="content">
        <div className="title">
          <h2>Screen</h2>
          <h2>_________________________________</h2>
        </div>
        <div className="seat-grid">
          {asientos.map((asiento) => (
            <button
              key={asiento.id}
              className={`seat ${
                asiento.estado === "ocupado"
                  ? "occupied"
                  : asiento.estado === "seleccionado"
                  ? "selected"
                  : "available"
              }`}
              onClick={() => seleccionarAsiento(asiento)}
              disabled={asiento.estado === "ocupado"}
              aria-label={`Asiento ${asiento.fila}${asiento.numero}, ${asiento.estado}`}
            >
              {asiento.numero}
            </button>
          ))}
        </div>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <span>Seleccionado</span>
          </div>
          <div className="legend-item">
            <div className="legend-color available"></div>
            <span>Disponible</span>
          </div>
          <div className="legend-item">
            <div className="legend-color occupied"></div>
            <span>Ocupado</span>
          </div>
        </div>
      </div>
      <div className="footer">
        <h3 className="selected-title">Asientos seleccionados:</h3>
        {asientosSeleccionados.length > 0 ? (
          <ul className="selected-list">
            {asientosSeleccionados.map((asiento) => (
              <li key={asiento.id}>
                Fila {asiento.fila}, Asiento {asiento.numero}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-selection">No has seleccionado ningún asiento.</p>
        )}
        <button
          className={`confirm-button ${
            asientosSeleccionados.length === 0 ? "disabled" : "active"
          }`}
          disabled={asientosSeleccionados.length === 0}
        >
          Confirmar selección
        </button>
      </div>
    </div>
  );
  return <Home menuContent={menu} pageContent={content} />;
}
 
export default Seats;
 
 