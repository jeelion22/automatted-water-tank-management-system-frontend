import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import chip from "./assets/chip.png";

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="nav-bar">
      <div className="nav-item">
        <h6>
          Virtual IoT <img src={chip} alt="Microchip" /> Test
        </h6>
      </div>
      <div className="nav-items">
        <div className="nav-list">
          <ul>
            <li>
              <Link to="/" className={`${active === "/" ? "active" : ""}`}>
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/insights"
                className={`${active === "/insights" ? "active" : ""}`}
              >
                Insights
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
