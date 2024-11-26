import React, { useState, useEffect } from "react";
import "./ToggleButton.css";
import productServices from "../services/productServices";

const ToggleButton = ({ setPumpStatus, setIsBuzzed }) => {
  const [isToggled, setIsToggled] = useState(false);

  // Loading toggle state from local storage
  useEffect(() => {
    const savedState = localStorage.getItem("toggleState");
    if (savedState !== null) {
      const parasedState = JSON.parse(savedState);
      setIsToggled(parasedState);
      setPumpStatus(parasedState);
    }
  }, [setPumpStatus]);

  // saving toggle state in localstorage
  useEffect(() => {
    localStorage.setItem("toggleState", JSON.stringify(isToggled));
  }, [isToggled]);

  // handle device start
  const handleDeviceStart = () => {
    productServices
      .startDevice()
      .then(() => {
        alert("Device started successfully");
        setIsToggled(true);
        setPumpStatus(true);
      })
      .catch((error) => console.log("Error starting device:", error));
  };

  // handle device stop
  const handleDeviceStop = () => {
    productServices
      .stopDevice()
      .then(() => {
        alert("Device stoped successfully");
        setIsToggled(false);
        setPumpStatus(false);
        setIsBuzzed(false);
      })
      .catch((error) => console.log("Error stopping device:", error));
  };

  //unified toggleHandler

  const handleToggle = () => {
    isToggled ? handleDeviceStop() : handleDeviceStart();
  };

  return (
    <div
      className={`toggle-outer ${isToggled ? "toggled" : ""}`}
      onClick={handleToggle}
    >
      <span className="toggle-label off">{!isToggled ? "OFF" : ""}</span>
      <div className="toggle-inner"></div>
      <span className="toggle-label on">{isToggled ? "ON" : ""}</span>
    </div>
  );
};

export default ToggleButton;
