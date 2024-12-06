import React, { useState } from "react";
import "./DefineProduct.css";
import EditComponents from "../../EditComponents";
import RemoveComponents from "../../RemoveComponents";
import RemoveAllComponents from "../../RemoveAllComponents";

import IoTComponents from "../../IoTComponents";

const componentMapping = {
  IoTComponents,
  EditComponents,
  RemoveComponents,
  RemoveAllComponents,
};

const DefineProduct = ({ productID }) => {
  const [activeComponent, setActiveComponet] = useState(null);

  const handleEdit = (componentName) => {
    setActiveComponet(componentName);
  };

  const ActiveComponent = componentMapping[activeComponent];

  return (
    <div className="product-definition-container">
      <h5>IoT Device</h5>
      <div className="device-control-btns edit-tools">
        <i
          className={`bi bi-plus-square ${
            activeComponent === "IoTComponents" ? "active" : ""
          }`}
          title="create product definition"
          onClick={() => handleEdit("IoTComponents")}
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

      {ActiveComponent && <ActiveComponent productID={productID} />}
    </div>
  );
};

export default DefineProduct;
