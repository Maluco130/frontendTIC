import "../styles/Seats.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const generarAsientos = (reservedSeats = []) => {
  const asientos = [];
  const totalAsientos = 150;

  for (let i = 1; i <= totalAsientos; i++) {
    asientos.push({
      id: i,
      numero: i,
      estado: reservedSeats.includes(i) ? "ocupado" : "disponible",
    });
  }

  return asientos;
};

function Seats({ idFun }) {
  const navigate = useNavigate();
  const [asientos, setAsientos] = useState(generarAsientos());
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [confirmacion, setConfirmacion] = useState(null); // Estado para la confirmación

  useEffect(() => {
    const fetchReservedSeats = async () => {
      try {
        const response = await axios.get(`https://wtf-cinema.onrender.com/seats/reserved/fun/${idFun}`);
        const reservedSeats = response.data;
        setAsientos(generarAsientos(reservedSeats));
      } catch (error) {
        console.error("Error al obtener los asientos reservados:", error);
        setAsientos(generarAsientos()); 
      }
    };

    if (idFun) fetchReservedSeats();
  }, [idFun]);

  const seleccionarAsiento = (asiento) => {
    if (asiento.estado === "ocupado") return;

    const nuevosAsientos = asientos.map((a) =>
      a.id === asiento.id
        ? { ...a, estado: a.estado === "seleccionado" ? "disponible" : "seleccionado" }
        : a
    );

    setAsientos(nuevosAsientos);
    setAsientosSeleccionados(nuevosAsientos.filter((a) => a.estado === "seleccionado"));
  };

  const confirmarReserva = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No se encontró un token de autenticación.");
      return;
    }

    const seatsNumberToReserve = asientosSeleccionados.map((asiento) => asiento.numero);
    const reservaData = {
      functionId: idFun,
      seatsNumberToReserve: seatsNumberToReserve,
    };

    try {
      const response = await axios.post("https://wtf-cinema.onrender.com/movies/reserve", reservaData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });

      console.log("Reserva exitosa:", response.data);
      setConfirmacion(seatsNumberToReserve); // Muestra la confirmación con los asientos reservados
    } catch (error) {
      console.error("Error al realizar la reserva:", error.response ? error.response.data : error.message);
    }
  };

  const volverInicio = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="content">
        {/* Solo muestra el título "Screen" si no hay confirmación */}
        {!confirmacion && (
          <div className="title">
            <h1>Screen</h1>
            <h2>________________________________________________</h2>
          </div>
        )}
        
        {confirmacion ? (
          <div className="confirmation-message">
            <h2>¡Reservaste exitosamente!</h2>
            <p>Asientos reservados: {confirmacion.join(", ")}</p>
            <button className="return-button" onClick={volverInicio}>
              Volver al inicio
            </button>
          </div>
        ) : (
          <div className="seats-and-legend">
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
                  aria-label={`Asiento ${asiento.numero}, ${asiento.estado}`}
                >
                  {asiento.numero}
                </button>
              ))}
            </div>

            <div className="legend-and-confirm">
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
              <div className="footer">
                <h3 className="selected-title">Asientos seleccionados:</h3>
                {asientosSeleccionados.length > 0 ? (
                  <ul className="selected-list">
                    {asientosSeleccionados.map((asiento) => (
                      <li key={asiento.id}>Asiento {asiento.numero}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-selection">Selecciona algún asiento.</p>
                )}
                <button
                  className={`confirm-button ${asientosSeleccionados.length === 0 ? "disabled" : "active"}`}
                  disabled={asientosSeleccionados.length === 0}
                  onClick={confirmarReserva}
                >
                  Confirmar selección
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Seats;
