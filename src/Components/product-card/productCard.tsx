// ProductsLayout.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Product } from "../../types/product.model";
import "./style.css";

interface Props {
  product: Product;
  height: number;
}
const ProductCard: React.FC<Props> = ({ product, height }) => {
  const inlineStyle = {
    height: height + "px",
  };

  const [currIndex, setCurrIndex] = useState(0);
  /** 
   * code to changes the image for every 5seconds
  const interval = 5000;
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrIndex((currIndex + 1) % product.imagesURLs.length);
    }, interval);
    console.log("Int call");
    return () => clearInterval(intervalId);
  }, [currIndex]);
  */
  const imageStyle = {
    height: height * 0.8 + "px",
  };
  const arrowNavsStyle = {
    bottom: height * 0.3 + "px",
  };
  return (
    <div className="container" style={inlineStyle}>
      <div className="card border-0 rounded shadow-sm" style={inlineStyle}>
        <div
          className="carousel-indicators custom-carousel-indicators"
          style={arrowNavsStyle}
        >
          {product.imagesURLs.map((img, index) => {
            return (
              <button
                type="button"
                data-bs-slide-to={index}
                className={`carousel-indicator-button ${
                  index === currIndex ? "indicator-button-active" : ""
                }`}
                onClick={() => setCurrIndex(index)}
                aria-label={`Slide ${index + 1}`}
              ></button>
            );
          })}
        </div>
        <div className="carousel-inner" style={imageStyle}>
          {product.imagesURLs.map((url, index) => (
            <div
              key={index}
              className={`custom-carousel carousel-item ${
                index === currIndex ? "active" : ""
              }`}
            >
              <img
                src={url}
                className="d-block w-100 rounded"
                alt={`sImage ${index}`}
              />
            </div>
          ))}
        </div>
        <div key={product.id} className="card-body">
          <div>
            <p className="my-0">
              <strong>{product.name}</strong>
            </p>
          </div>
          <div>
            <p className="my-0">
              <small>{product.description}</small>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <span className="pe-1">
                <b>$</b>
              </span>
              55.5
            </div>
            <div>
              <i>5</i> <span>&#11088;</span>
            </div>
          </div>
          <div
            id={`carousel${product.id}`}
            className="carousel slide"
            data-bs-ride="carousel"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
