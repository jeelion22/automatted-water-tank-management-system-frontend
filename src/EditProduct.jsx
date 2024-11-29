import React, { useState } from "react";
import "./EditProduct.css";
import CreateDevice from "./CreateDevice";
import productServices from "../services/productServices";
import EditComponents from "./EditComponents";
import RemoveComponents from "./RemoveComponents";
import RemoveAllComponents from "./RemoveAllComponents";

const componentMapping = {
  CreateDevice,
  EditComponents,
  RemoveComponents,
  RemoveAllComponents,
};

const EditProduct = ({ productID }) => {
  const [activeComponent, setActiveComponet] = useState(null);

  const handleEdit = (componentName) => {
    setActiveComponet(componentName);
  };

  const ActiveComponent = componentMapping[activeComponent];

  return (
    <div className="device-edit">
      <div className="device-tool-container">
        <div className="device-count-container">
          <div className="total-device">Total Device(s):</div>
          <div className="running-device">Device(s) Running:</div>
        </div>

        <div className="edit-tools">
          <i
            className={`bi bi-plus-square ${
              activeComponent === "CreateDevice" ? "active" : ""
            }`}
            title="create new device"
            onClick={() => handleEdit("CreateDevice")}
          ></i>
          <i
            className={`bi bi-dash-square ${
              activeComponent === "RemoveComponents" ? "active" : ""
            }`}
            title="remove components"
            onClick={() => handleEdit("RemoveComponents")}
          ></i>
          <i
            className={`bi bi-pencil-square ${
              activeComponent === "EditComponents" ? "active" : ""
            }`}
            title="edit components"
            onClick={() => handleEdit("EditComponents")}
          ></i>
          <i
            className={`bi bi-trash3 ${
              activeComponent === "RemoveAllComponents" ? "active" : ""
            }`}
            title="remove all device components"
            onClick={() => handleEdit("RemoveAllComponents")}
          ></i>
        </div>
      </div>

      {ActiveComponent && <ActiveComponent productID={productID} />}
    </div>
  );
};

export default EditProduct;
