import React, { useState } from "react";
import Home from "./Home.jsx";
import "../styles/Reservas.css";

const CancelarReservaciones = () => {
  const [reservaciones, setReservaciones] = useState([
    {
      id: 1,
      pelicula: "Inception",
      fecha: "2023-06-15",
      hora: "19:00",
      asientos: ["A1", "A2"],
    },
    {
      id: 2,
      pelicula: "The Dark Knight",
      fecha: "2023-06-16",
      hora: "20:30",
      asientos: ["B3", "B4", "B5"],
    },
    {
      id: 3,
      pelicula: "Interstellar",
      fecha: "2023-06-17",
      hora: "18:45",
      asientos: ["C2"],
    },
  ]);

  const [reservacionSeleccionada, setReservacionSeleccionada] = useState(null);

  const cancelarReservacion = (id) => {
    setReservaciones(
      reservaciones.filter((reservacion) => reservacion.id !== id)
    );
    setReservacionSeleccionada(null);
  };

  const abrirDialogo = (reservacion) => {
    setReservacionSeleccionada(reservacion);
  };

  const cerrarDialogo = () => {
    setReservacionSeleccionada(null);
  };

  const menu = (
    <div className="nav-buttons">{/* Menú vacío intencionalmente */}</div>
  );

  const content = (
    <div className="cancelar-reservaciones">
      <h1 className="titulo-principal">Cancelar Reservaciones</h1>
      {reservaciones.length === 0 ? (
        <div className="mensaje-sin-reservaciones">
          <h2>No tienes reservaciones activas.</h2>
        </div>
      ) : (
        <div className="lista-reservaciones">
          {reservaciones.map((reservacion) => (
            <div key={reservacion.id} className="tarjeta-reservacion">
              <h2 className="tarjeta-reservacion-titulo">
                {reservacion.pelicula}
              </h2>
              <p className="tarjeta-reservacion-detalle">
                <strong>Fecha:</strong> {reservacion.fecha}
              </p>
              <p className="tarjeta-reservacion-detalle">
                <strong>Hora:</strong> {reservacion.hora}
              </p>
              <p className="tarjeta-reservacion-detalle">
                <strong>Asientos:</strong> {reservacion.asientos.join(", ")}
              </p>
              <button
                className="boton-cancelar"
                onClick={() => abrirDialogo(reservacion)}
              >
                Cancelar Reservación
              </button>
            </div>
          ))}
        </div>
      )}
      {reservacionSeleccionada && (
        <div className="dialogo-fondo">
          <div className="dialogo-contenedor">
            <h2>¿Estás seguro que deseas cancelar esta reservación?</h2>
            <p>
              Esta acción no se puede deshacer. Se cancelará tu reservación para{" "}
              {reservacionSeleccionada.pelicula}.
            </p>
            <div className="botones-dialogo">
              <button className="boton-secundario" onClick={cerrarDialogo}>
                Cancelar
              </button>
              <button
                className="boton-primario"
                onClick={() => cancelarReservacion(reservacionSeleccionada.id)}
              >
                Sí, cancelar reservación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return <Home menuContent={menu} pageContent={content} />;
};

export default CancelarReservaciones;
