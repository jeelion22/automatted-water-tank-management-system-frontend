import React from "react";
import "./Root.css";
import RootNavbar from "../RootNavbar/RootNavbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="container-fluid root-container">
      <div className="row width-100">
        <div className="col ">
          <RootNavbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
