import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import silent from "../src/assets/silent.png";
import loud from "../src/assets/loud.png";
import productServices from "../services/productServices";

const Dashboard = () => {
  const [pumpStatus, setPumpStatus] = useState(true);
  const [isOverflow, setIsOverflow] = useState(false);
  const [gasQuality, setGasQuality] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [solarEnergyConsumption, setSolarEnergyConsumption] = useState(0);
  const [isBuzzed, setIsBuzzed] = useState(false);

  // call for generate data
  useEffect(() => {
    const generateData = setInterval(() => {
      productServices
        .generateData()
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }, 10 * 1000); // 10 seconds

    return () => clearInterval(generateData);
  }, []);

  // call for get data
  useEffect(() => {
    productServices;
    const getData = setInterval(() => {
      productServices
        .getProductData()
        .then((result) => {
          const res = result.data.data.data;
          const currentData = res[res.length - 1];
          console.log(currentData);
          setWaterLevel(Number(currentData.floatSensor));
          setGasQuality(Number(currentData.gaseSensor / 5000) * 100);
          setSolarEnergyConsumption(
            Number((currentData["solar-sensor"] / 1000) * 100)
          );

          if (Number(currentData.floatSensor) > 80) {
            setIsOverflow(true);
            setPumpStatus(false);
          } else if (Number(currentData.floatSensor) < 10) {
            setIsOverflow(false);
            setPumpStatus(true);
            setIsBuzzed(true);
          } else {
            setIsBuzzed(false);
          }
        })
        .catch((error) => console.log(error));
    }, 5 * 1000); //5 seconds

    return () => clearInterval(getData);
  }, []);

  return (
    <div className="container">
      <div className="row dashboard">
        {/* dashboard title */}

        <h2 className="title">
          Automated Water Level Management System <br />
          Dashboard
        </h2>
      </div>

      {/* dashboard container */}

      <div className="row dashbord-container">
        <div className="col sensors-readings">
          <div
            class="card border-primary mb-3"
            style={{ "max-width": "18rem;" }}
          >
            {/* water level monitor card */}

            <div class="card-header">Live Water Level</div>
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

          {/* gas buildup monitor card */}

          <div
            class="card border-primary mb-3"
            style={{ "max-width": "18rem;" }}
          >
            <div class="card-header">Live hazardous Gas Build Up Level</div>
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

          {/* solar power consumption card */}

          <div
            class="card border-primary mb-3"
            style={{ "max-width": "18rem;" }}
          >
            <div class="card-header">Live Solar Energy Consumption Level</div>
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

        {/* status board card */}

        <div className="col status-board">
          <div
            class="card border-primary mb-3"
            style={{ "max-width": "18rem" }}
          >
            <div class="card-header">Control Pannel</div>
            <div class="card-body text-primary">
              <div className="status">
                <h5>Pump Status: </h5>
                <span
                  className="pump-status"
                  style={{ color: pumpStatus ? "green" : "red" }}
                >
                  {pumpStatus ? "ON" : "OFF"}
                </span>
              </div>
              <div className="light-buzzer-container">
                <h5>Overflow: </h5>

                <div
                  className="overflow-light"
                  style={{ backgroundColor: isOverflow ? "red" : "green" }}
                ></div>
              </div>

              <div className="water-low">
                <h5>Water Shortage Buzzer:</h5>
                {isBuzzed ? (
                  <div className="water-shortage">
                    <img src={loud} alt="Buzzered" />
                  </div>
                ) : (
                  <div className="water-shortage">
                    <img src={silent} alt="Unbuzzered" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
