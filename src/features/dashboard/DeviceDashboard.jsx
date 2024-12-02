import React from "react";

const DeviceDashboard = ({ deviceID, productID }) => {
  return (
    <div>
      <p>Product ID: {productID}</p>
      <p>Device ID: {deviceID}</p>
    </div>
  );
};

export default DeviceDashboard;
