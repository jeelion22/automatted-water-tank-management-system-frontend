import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../users/userSlice";
import ProductNotFound from "./ProductNotFound";
import Product from "./Product";

const Dashboard = () => {
  const user = useSelector(selectCurrentUser);

  const products = user.products.length > 0 ? user.products : null;

  return (
    <div className="container">
      <div className="row ">
        <div className="col d-flex justify-content-center align-items-center mt-4">
          {!products ? <ProductNotFound /> : <Product products={products} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
