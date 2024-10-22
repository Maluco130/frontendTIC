import "../styles/Home.css";
import Logo from "../images/WhatsApp Image 2024-10-19 at 19.50.34.png";

function Home({ menuContent, pageContent }) {
  return (
    <div className="page-container">
      <nav className="sidebar">
        <button className="nav-toggle">Login</button>
        {menuContent}
      </nav>
      <div className="main-content">
        <header className="header">
          <h1>What The Fun</h1>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
        </header>
        <main className="content">{pageContent}</main>
      </div>
    </div>
  );
}

export default Home;
