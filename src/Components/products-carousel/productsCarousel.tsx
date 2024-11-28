import { Product } from "../../types/product.model";
import ProductCard from "../product-card/productCard";
import "./style.css";
interface ProductsCarouselProps {
  products: Product[];
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
          {products.map((product) => (
            <div className="col col-xxl-3 col-lg-3 col-xl-3 col-md-4 col-sm-6 col-12">
              <ProductCard product={product} height={400} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCarouselLayout;
