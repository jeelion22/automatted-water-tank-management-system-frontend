import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import silent from "../src/assets/silent.png";
import loud from "../src/assets/loud.png";
import productServices from "../services/productServices";
import ToggleButton from "./ToggleButton";
import EditProduct from "./EditProduct";

function DeviceDashboard(selectedProduct) {
  return (
    <div className="dashboard-grid">
      <div className="card">
        <h3>Live Water Level</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${waterLevel}%` }}
          ></div>
        </div>
        <p>{waterLevel}%</p>
      </div>
      <div className="card">
        <h3>Gas Build-up Level</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${gasQuality}%` }}
          ></div>
        </div>
        <p>{Number(gasQuality).toFixed(2)}%</p>
      </div>
      <div className="card">
        <h3>Solar Energy Consumption</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${solarEnergyConsumption}%` }}
          ></div>
        </div>
        <p>{Number(solarEnergyConsumption).toFixed(2)}%</p>
      </div>
      <div className="card">
        <h3>Control Panel</h3>

        <div className="toggle-cotainer d-flex justify-content-center align-items-center gap-4 p-2">
          <div>
            <strong>Device</strong>
          </div>

          <div>
            <ToggleButton
              setPumpStatus={setPumpStatus}
              setIsBuzzed={setIsBuzzed}
            />
          </div>
        </div>
        <p>
          <strong>Pump Status:</strong>{" "}
          <span style={{ color: pumpStatus ? "green" : "red" }}>
            {pumpStatus ? "ON" : "OFF"}
          </span>
        </p>
        <p>
          <strong>Overflow:</strong>{" "}
          <span
            className={`status-light ${
              pumpStatus ? (isOverflow ? "red" : "yellow") : "off"
            }`}
          ></span>
        </p>
        <p>
          <strong>Water Shortage Buzzer:</strong>
        </p>
        <div>
          <img src={isBuzzed ? loud : silent} alt="Buzzer" className="buzzer" />
        </div>
      </div>
    </div>
  );
}

const Dashboard = ({ selectedProduct }) => {
  const [pumpStatus, setPumpStatus] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [gasQuality, setGasQuality] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [solarEnergyConsumption, setSolarEnergyConsumption] = useState(0);
  const [isBuzzed, setIsBuzzed] = useState(false);
  const [isDeviceCreated, setIsDeviceCreated] = useState(false);

  // Fetch data periodically
  useEffect(() => {
    const generateData = setInterval(() => {
      productServices
        .generateData()
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }, 10 * 1000);

    return () => clearInterval(generateData);
  }, []);

  useEffect(() => {
    const getData = setInterval(() => {
      productServices
        .getProductData()
        .then((result) => {
          const res = result.data.data.data;
          console.log(result);
          const currentData = res[res.length - 1];
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
    }, 5 * 1000);

    return () => clearInterval(getData);
  }, []);

  useEffect(() => {
    productServices
      .checkDeviceRunningStatus(selectedProduct.productID)
      .catch((error) => {
        console.log(error);
        alert(
          `${error.response.data.message.message}, please create a new device. `
        );
        setIsDeviceCreated(false);
      });
  }, [selectedProduct]);

  return (
    <div className="contrainer dashboard">
      <div className="row">
        <div className="col dashboard-container">
          <header className="dashboard-header">
            <h1>{selectedProduct?.name?.toString()?.toUpperCase()}</h1>
            <h2>Dashboard</h2>
          </header>

          <div className="product-controller">
            <EditProduct productID={selectedProduct?.productID} />
          </div>

          {isDeviceCreated ? (
            <DeviceDashboard />
          ) : (
            <div className="no-device-message-container">
              <p>No devices found, please create a new device </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
