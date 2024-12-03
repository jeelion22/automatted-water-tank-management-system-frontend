import "./Product.css";
import React, { useState } from "react";
import CreateDevice from "./CreateDevice";
import DeviceDashboard from "./DeviceDashboard";
import DefineProduct from "./DefineProduct";

const Product = ({ products, triggerToast }) => {
  const [productID, setProductID] = useState("");
  const [viewProduct, setViewProduct] = useState(false);
  const [deviceID, setDeviceID] = useState("");
  const [createDevice, setCreateDevice] = useState(false);
  const [listDevices, setListDevices] = useState(false);
  const [defineProduct, setDefineProduct] = useState(false);

  const toggleProduct = (product) => {
    if (productID === product.productID && viewProduct) {
      setViewProduct(false);
    } else {
      setViewProduct(true);
      setProductID(product.productID);
      setCreateDevice(false);
      setDeviceID("");
    }
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
                  onClick={() => {
                    toggleProduct(product);
                  }}
                >
                  {product.name.toUpperCase()}
                </button>

                {viewProduct && productID === product.productID && (
                  <div className="devices">
                    <div className="device-operations-btns">
                      <button
                        className={`define-product-btn ${
                          defineProduct ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();

                          setDefineProduct(true);
                          setCreateDevice(false);
                          setListDevices(false);
                          setProductID(product.productID);
                          setDeviceID(false);
                        }}
                      >
                        Define Product
                      </button>

                      <button
                        className={`create-device-btn ${
                          createDevice ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCreateDevice(true);
                          setListDevices(false);
                          setProductID(product.productID);
                          setDeviceID(false);
                          setDefineProduct(false);
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
                          // setCreateDevice(false);
                          setProductID(product.productID);
                          setDeviceID(false);
                          // setDefineProduct(false);
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
                                  setDefineProduct(false);
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

        {defineProduct && !deviceID && (
          <div className="col-md-12 col-sm-12 col-lg-6 selection">
            <DefineProduct productID={productID} triggerToast={triggerToast} />
          </div>
        )}

        {createDevice && (
          <div className="col-md-12 col-sm-12 col-lg-6 selection">
            <CreateDevice productID={productID} triggerToast={triggerToast} />
          </div>
        )}

        {productID && deviceID && !createDevice && (
          <div className="col-md-12 col-sm-12 col-lg-6 selection">
            <DeviceDashboard deviceID={deviceID} productID={productID} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
