import React from "react";

const Product = ({ products }) => {
  return (
    <div className="product-container">
      <ol>
        {products.map((product, index) => (
          <li key={index}>
            <a href="#">{product.name.toUpperCase()}</a>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Product;
