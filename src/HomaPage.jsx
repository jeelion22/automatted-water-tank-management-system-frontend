import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

const HomaPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    const productsAvailable = localStorage.getItem("products");
    setProducts(productsAvailable ? JSON.parse(productsAvailable) : []);
  }, []);

  const handleProductSelect = (productID) => {
    setSelectedProduct(
      products.filter((product) => product.productID === productID)[0]
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-auto sidebar-container">
          <Sidebar
            handleProductSelect={handleProductSelect}
            products={products}
          />
        </div>

        <div className="col-8">
          <Dashboard selectedProduct={selectedProduct} />
        </div>
      </div>
    </div>
  );
};

export default HomaPage;
