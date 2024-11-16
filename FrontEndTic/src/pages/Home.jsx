import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home({ menuContent, pageContent }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleSelect = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    setUserName(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="page-container">
      <nav className="sidebar">
        <div className="user-container">
          {userName ? (
            <div className="user-info">
              <button className="user-button" onClick={toggleDropdown}>
                {userName}
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => handleSelect("/reservas")}
                  >
                    Ver mis reservas
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="nav-toggle"
              onClick={() => handleSelect("/login")}
            >
              Iniciar Sesión
            </button>
          )}
        </div>

        <div className="nav-buttons-container">{menuContent}</div>
      </nav>
      <div className="main-content">
        <main className="content">{pageContent}</main>
      </div>
    </div>
  );
}

export default Home;
