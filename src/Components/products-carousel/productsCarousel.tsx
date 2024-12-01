import { useState } from "react";
import { Product } from "../../types/product.model";
import ProductCard from "../product-card/productCard";
import "./style.css";
interface ProductsCarouselProps {
  products: any;
  isImages: boolean;
  images: string[];
  heading: string;
}

const ProductsCarouselLayout: React.FC<ProductsCarouselProps> = ({
  products,
  isImages,
  images,
  heading,
}) => {
  const [cart, setCart] = useState<any[]>([]);

  // Add a product to the cart
  const handleAddToCart = (product: any) => {
    setCart((prevCart) => {
      console.log("add to cart", product, prevCart);
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : { ...item, quantity: 1 }
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // console.log("ProductsCarouselLayout",products)
  const headingEle = <h3>{heading?.toUpperCase()}</h3>;
  return (
    <div className="product-layout-container">
      <div className="d-flex align-items-center justify-content-center my-3">
        <div className="product-layout-header">{headingEle}</div>
        {/* TODO: future enhancement for product */}
        <div className="d-none">
          <button className="btn carousel-left-btn">
            <i className="fa fa-chevron-left"></i>
          </button>
          <button className="btn carousel-right-btn">
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="product-cards-container row">
        <div className="product-cards-container-inner row">
          {products.map((product: any) => (
            <div className="col col-xxl-3 col-lg-3 col-xl-3 col-md-4 col-sm-6 col-12">
              {/* {product.images.length} */}
              <ProductCard
                product={product}
                height={400}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCarouselLayout;
