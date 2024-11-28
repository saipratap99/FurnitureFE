// ProductsLayout.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Product } from "../../types/product.model";

interface Props {
  products: Product[];
}
const ProductsLayout: React.FC<Props> = ({ products }) => {
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
            <div>{product.name}</div>
            <div>{product.description}</div>
            <div
              id={`carousel${product.id}`}
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {product.imagesURLs.map((url, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={url}
                      className="d-block w-100"
                      alt={`sImage ${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsLayout;
