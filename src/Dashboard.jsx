import React, { useState } from "react";
import "./Dashboard.css";
import silent from "../src/assets/silent.png";
import loud from "../src/assets/loud.png";

const Dashboard = () => {
  const [pumpStatus, setPumpStatus] = useState(true);
  const [isOverflow, setIsOverflow] = useState(true);
  const [isSwitched, setIsSwitched] = useState(false);
  const [gasQuality, setGasQuality] = useState(25);
  const [waterLevel, setWaterLevel] = useState(85);
  const [solarEnergyConsumption, setSolarEnergyConsumption] = useState(49);
  const [isBuzzed, setIsBuzzed] = useState(false);

  return (
    <div className="container">
      <div className="row ">
        <h2 className="title">Automated Water Level Management System</h2>
      </div>
      <div className="row dashbord-container">
        <div className="col sensors-readings">
          <div
            class="card border-primary mb-3"
            style={{ "max-width": "18rem;" }}
          >
            <div class="card-header">Water Level</div>
            <div class="card-body text-primary">
              <h5 class="card-title">Status: </h5>
              <div
                class="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  class="progress-bar"
                  style={{ width: `${waterLevel}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div
            class="card border-primary mb-3"
            style={{ "max-width": "18rem;" }}
          >
            <div class="card-header">Hazardous Gas Level</div>
            <div class="card-body text-primary">
              <h5 class="card-title">Status: </h5>
              <div
                class="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  class="progress-bar"
                  style={{ width: `${gasQuality}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div
            class="card border-primary mb-3"
            style={{ "max-width": "18rem;" }}
          >
            <div class="card-header">Solar Energy Consumption</div>
            <div class="card-body text-primary">
              <h5 class="card-title">Status: </h5>
              <div
                class="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  class="progress-bar"
                  style={{ width: `${solarEnergyConsumption}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col status-board">
          <div
            class="card border-primary mb-3"
            style={{ "max-width": "18rem" }}
          >
            <div class="card-header">Control Pannel</div>
            <div class="card-body text-primary">
              <h5 class="card-title">Status</h5>

              <div className="status">
                <span>Pump Status:</span>
                <span
                  className="pump-status"
                  style={{ color: pumpStatus ? "green" : "red" }}
                >
                  {pumpStatus ? "On" : "Off"}
                </span>
              </div>
              <div className="light-buzzer-container">
                <span>Overflow: </span>

                <span
                  className="overflow-light"
                  style={{ backgroundColor: isOverflow ? "green" : "yellow" }}
                ></span>

                {isBuzzed ? (
                  <img src={loud} alt="Buzzered" />
                ) : (
                  <img src={silent} alt="Unbuzzered" />
                )}
              </div>

              <div className="switch-container">
                <div>Switch motor: </div>
                <button
                  className={`btn ${isSwitched ? "btn-danger" : "btn-success"}`}
                  onClick={() => {
                    setIsSwitched((pre) => !pre);
                  }}
                >
                  {isSwitched ? "Off" : "On"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
