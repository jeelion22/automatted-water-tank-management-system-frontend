import { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ products, handleProductSelect }) => {
  const [isProductClicked, setIsProductClicked] = useState(false);
  const [activeProductID, setActiveProductId] = useState(null);

  const handleProductClick = () => {
    setIsProductClicked((prev) => !prev);
  };

  return (
    <section>
      <div className="products-list">
        <div
          className="product-title"
          role="button"
          onClick={handleProductClick}
        >
          Products
        </div>
        {isProductClicked && (
          <ol className="list-container">
            {products.map((product, index) => (
              <li key={index}>
                <div
                  role="button"
                  className={`product-item ${
                    activeProductID === product.productID ? "active" : ""
                  }`}
                  onClick={function () {
                    setActiveProductId(product.productID);
                    handleProductSelect(product.productID);
                  }}
                >
                  {product.name}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};

export default Sidebar;
