import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home.jsx";
import "../styles/Reservas.css";

const CancelarReservaciones = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [reservacionSeleccionada, setReservacionSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("userEmail");

    if (!authToken || !userEmail) {
      navigate("/"); // Redirige al Home si no está autenticado
      return;
    }

    const fetchReservaciones = async () => {
      try {
        const response = await fetch(
          `https://wtf-cinema.onrender.com/movies/user/${userEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener las reservaciones.");
        }

        const data = await response.json();
        setReservaciones(data);
      } catch {
        navigate("/"); // Redirige al Home si hay algún error
      } finally {
        setLoading(false);
      }
    };

    fetchReservaciones();
  }, [navigate]);

  const cancelarReservacion = async (bookingId, seatsToCancel) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/"); // Redirige al Home si no hay token
      return;
    }

    const bodyData = JSON.stringify({ bookingId, seatsToCancel });

    try {
      await fetch(`https://wtf-cinema.onrender.com/movies/cancelReserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: bodyData,
      });

      // Redirigir directamente al Home tras la cancelación, sin mostrar mensajes
      navigate("/");
    } catch {
      navigate("/"); // Redirige al Home incluso si hay error
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
      ) : reservaciones.length === 0 ? (
        <div className="mensaje-sin-reservaciones">
          <h2>No tienes reservaciones activas.</h2>
        </div>
      ) : (
        <div className="lista-reservaciones">
          {reservaciones.map((reservacion) => {
            const {
              movieTitle,
              branchNeighborhood,
              startTime,
              seats,
              functionId,
            } = reservacion;

            let cine = branchNeighborhood || "Cine no disponible";
            let hora = startTime || "Hora no disponible";

            return (
              <div key={functionId} className="tarjeta-reservacion">
                <h2 className="tarjeta-reservacion-titulo">
                  {movieTitle || "Película no disponible"}
                </h2>
                <p className="tarjeta-reservacion-detalle">
                  <strong>Cine:</strong> {cine}
                </p>
                <p className="tarjeta-reservacion-detalle">
                  <strong>Hora:</strong> {hora}
                </p>
                <p className="tarjeta-reservacion-detalle">
                  <strong>Asientos:</strong>{" "}
                  {seats && seats.length > 0 ? seats.join(", ") : "Cancelada"}
                </p>
                <button
                  className="boton-cancelar"
                  onClick={() => abrirDialogo(reservacion)}
                  disabled={!seats || seats.length === 0} // Deshabilitar botón si no hay asientos
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
                onClick={() => {
                  cancelarReservacion(
                    reservacionSeleccionada.functionId,
                    reservacionSeleccionada.seats
                  );
                }}
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
