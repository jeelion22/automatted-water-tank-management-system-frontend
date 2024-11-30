import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import chip from "./assets/chip.png";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  selectCurrentUser,
  selectUserLogoutStatus,
} from "./features/users/userSlice";

const Navbar = ({ triggerToast }) => {
  const user = useSelector(selectCurrentUser);
  const logoutStatus = useSelector(selectUserLogoutStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstname = user?.firstname.toUpperCase();
  const lastname = user?.lastname ? user.lastname.toUpperCase() : "";

  const fullname = firstname + " " + lastname;

  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const handleLogOut = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        triggerToast("Logout successful!");
        navigate("/login");
      })
      .catch((error) => triggerToast(error));
  };

  return (
    <nav class="navbar private navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Test IoT
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Create Product
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">
                Insights
              </a>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#">
                    {fullname}
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={handleLogOut}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    // <nav className="nav-bar">
    //   <div className="nav-item">
    //     <h6>
    //       Virtual IoT <img src={chip} alt="Microchip" /> Test
    //     </h6>
    //   </div>
    //   <div className="nav-items">
    //     <div className="nav-list">
    //       <ul>
    //         <li>
    //           <Link
    //             to="/dashboard"
    //             className={`${active === "/dashboard" ? "active" : ""}`}
    //           >
    //             Dashboard
    //           </Link>
    //         </li>

    //         <li>
    //           <Link
    //             to="/create-product"
    //             className={`${active === "/create-product" ? "active" : ""}`}
    //           >
    //             Create Product
    //           </Link>
    //         </li>

    //         <li>
    //           <Link
    //             to="/insights"
    //             className={`${active === "/insights" ? "active" : ""}`}
    //           >
    //             Insights
    //           </Link>
    //         </li>

    //         <li class="nav-item dropdown">
    //           <a
    //             class="nav-link dropdown-toggle"
    //             href="#"
    //             role="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             Profile
    //           </a>
    //           <ul class="dropdown-menu">
    //             <li>
    //               <a class="dropdown-item" href="#">
    //                 Action
    //               </a>
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
