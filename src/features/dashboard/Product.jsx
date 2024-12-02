import "./Product.css";
import React, { useState } from "react";
import CreateDevice from "./CreateDevice";
import DeviceDashboard from "./DeviceDashboard";

const Product = ({ products, triggerToast }) => {
  const [viewDevice, setViewDevice] = useState(true);
  const [devices, setDevices] = useState([]);
  const [productID, setProductID] = useState("");
  const [showDevices, setShowDevices] = useState(false);
  const [deviceID, setDeviceID] = useState(
    products[0]?.devices?.[0]?.deviceID || ""
  );
  const [createDevice, setCreateDevice] = useState(false);
  const [listDevices, setListDevices] = useState(false);

  const handleDevice = (product) => {
    setViewDevice(true);
    // setDevices(product.devices);
    setShowDevices((prev) => !prev);
    setProductID(product.productID);
    setCreateDevice(false);
    setDeviceID(false);
  };

  return (
    <div className="product-container w-100 ">
      <div className="row justify-content-center gap-2 p-2">
        {/* Product List */}
        <div className="col-md-12 col-sm-12 col-lg-5 product-list">
          <h5>Products</h5>
          <ol>
            {products.map((product, index) => (
              <li key={index}>
                <button
                  className={`product-btn ${
                    productID === product.productID ? "active" : ""
                  }`}
                  onClick={() => handleDevice(product)}
                >
                  {product.name.toUpperCase()}
                </button>

                {showDevices && productID === product.productID && (
                  <div className="devices">
                    <div className="device-operations-btns">
                      <button
                        className={`create-device-btn ${
                          createDevice ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCreateDevice((prev) => !prev);
                          setListDevices(false);
                          setProductID(product.productID);
                          setDeviceID(false);
                        }}
                      >
                        Create Device
                      </button>

                      <button
                        className={`list-device-btn ${
                          listDevices ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setListDevices((prev) => !prev);
                          setCreateDevice(false);
                          setProductID(product.productID);
                          setDeviceID(false);
                        }}
                      >
                        Devices
                      </button>
                    </div>

                    {listDevices && (
                      <ol>
                        {product.devices.length > 0 ? (
                          product.devices.map((device, index) => (
                            <li key={index}>
                              <button
                                className={`device-btn  ${
                                  !createDevice && deviceID === device
                                    ? "active"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeviceID(device);
                                  setCreateDevice(false);
                                }}
                              >
                                {device}
                              </button>
                            </li>
                          ))
                        ) : (
                          <li style={{ listStyle: "none" }}>
                            No devices found
                          </li>
                        )}
                      </ol>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Right Content Section */}
        {createDevice && (
          <div className="col-md-12 col-sm-12 col-lg-6 selection">
            <CreateDevice productID={productID} triggerToast={triggerToast} />
          </div>
        )}

        {productID && !createDevice && (
          <div className="col-md-12 col-sm-12 col-lg-6 selection">
            <DeviceDashboard deviceID={deviceID} productID={productID} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
