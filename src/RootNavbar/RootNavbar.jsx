import { Link } from "react-router-dom";
import "./RootNavbar.css";

const RootNavbar = () => {
  return (
    <nav className="navbar public navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          IoT Virtual Device
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link
              to={"/register"}
              className="nav-link active"
              aria-current="page"
            >
              Register
            </Link>
            <Link className="nav-link" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RootNavbar;
