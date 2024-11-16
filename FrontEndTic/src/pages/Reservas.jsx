import React, { useEffect, useState } from "react";
import Home from "./Home.jsx";
import "../styles/Reservas.css"; // Asegúrate de enlazar el archivo CSS

const CancelarReservaciones = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [reservacionSeleccionada, setReservacionSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener token de autenticación y correo electrónico desde localStorage
    const authToken = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("userEmail");

    if (!authToken || !userEmail) {
      setError("No estás autenticado. Por favor, inicia sesión.");
      setLoading(false);
      return;
    }

    // Función para obtener las reservaciones desde el backend
    const fetchReservaciones = async () => {
      try {
        const response = await fetch(
          `https://wtf-cinema.onrender.com/movies/user/${userEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`, // Enviar el token en el encabezado
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
              : "Error al obtener las reservaciones."
          );
        }

        const data = await response.json();
        setReservaciones(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservaciones();
  }, []);

  const cancelarReservacion = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      const response = await fetch(
        `https://wtf-cinema.onrender.com/movies/reservation/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Enviar el token en el encabezado
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al cancelar la reservación.");
      }

      // Actualizar las reservaciones locales después de la eliminación
      setReservaciones((prevReservaciones) =>
        prevReservaciones.filter((reservacion) => reservacion.id !== id)
      );

      setReservacionSeleccionada(null);
    } catch (error) {
      setError(error.message);
    }
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
      {loading ? (
        <p className="mensaje-sin-reservaciones">Cargando reservaciones...</p>
      ) : error ? (
        <div className="mensaje-sin-reservaciones">
          <h2>Error: {error}</h2>
        </div>
      ) : reservaciones.length === 0 ? (
        <div className="mensaje-sin-reservaciones">
          <h2>No tienes reservaciones activas.</h2>
        </div>
      ) : (
        <div className="lista-reservaciones">
          {reservaciones.map((reservacion) => {
            const { movieTitle, startTime, seats } = reservacion;
            const fecha = startTime ? startTime.split("T")[0] : "Fecha no disponible";
            const hora = startTime && startTime.split("T")[1]
              ? startTime.split("T")[1].slice(0, 5)
              : "Hora no disponible";

            return (
              <div key={reservacion.id} className="tarjeta-reservacion">
                <h2 className="tarjeta-reservacion-titulo">{movieTitle || "Película no disponible"}</h2>
                <p className="tarjeta-reservacion-detalle">
                  <strong>Fecha:</strong> {fecha}
                </p>
                <p className="tarjeta-reservacion-detalle">
                  <strong>Hora:</strong> {hora}
                </p>
                <p className="tarjeta-reservacion-detalle">
                  <strong>Asientos:</strong> {seats && seats.length > 0 ? seats.join(", ") : "No se especificaron asientos"}
                </p>
                <button
                  className="boton-cancelar"
                  onClick={() => abrirDialogo(reservacion)}
                >
                  Cancelar Reservación
                </button>
              </div>
            );
          })}
        </div>
      )}
      {reservacionSeleccionada && (
        <div className="dialogo-fondo">
          <div className="dialogo-contenedor">
            <h2>¿Estás seguro que deseas cancelar esta reservación?</h2>
            <p>
              Esta acción no se puede deshacer. Se cancelará tu reservación para{" "}
              {reservacionSeleccionada.movieTitle || "Película no disponible"}.
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
