import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import "../App.css";

interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: { text: string; href: string }[];
  isAuthenticated?: boolean;
  user?: any;
  onLogout?: () => void;
}

function NavBar({ brandName, imageSrcPath, navItems, isAuthenticated = false, user, onLogout }: NavBarProps) {
  const location = useLocation(); // Get the current location
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    // Determine which index should be active based on the current path
    const currentIndex = navItems.findIndex(item => item.href === location.pathname);
    setSelectedIndex(currentIndex);
  }, [location.pathname, navItems]); // Update when location or navItems change

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"> 
          <img
            src={imageSrcPath}
            width="60"
            height="60"
            className="d-inline-block align-center"
            alt=""
          />
          <span className="fw-bold fs-5">{brandName}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse align-items-start flex-column flex-md-row"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-md-1">
            {navItems.map((item, index) => (
              <li
                key={item.text}
                className="nav-item"
              >
                <Link
                  className={
                    selectedIndex === index
                      ? "nav-link active fw-bold"
                      : "nav-link"
                  }
                  to={item.href}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            
            {/* Authentication section */}
            <li className="nav-item">
              {isAuthenticated ? (
                <div className="d-flex align-items-center">
                  <div className="vr" style={{width: '2px', backgroundColor: '#000', marginRight: '10px', marginLeft: '10px'}}></div>
                  <span className="nav-link welcome-text fw-bold me-3" style={{color: '#06402B'}}>
                    Welcome, {user?.username}!
                  </span>
                  <button
                    className="btn logoutBtn btn-sm"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link className="loginNavbar btn px-3" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
