import { FC, useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import "../Components/pages/category-page/style.css";
import SubCategoryNavigation from "../Components/sub-category-navigation/sub-category-navigation";
import ProductCard from "../Components/product-card/productCard";

interface CategoryPageProps {}

const CategoryPage: FC<CategoryPageProps> = () => {
  const { categName } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = categName;

  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch subcategories based on the category
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5194/api/v1/Category/GetSubcategories/${selectedCategory}`
        );
        setSubcategories(response.data);
      } catch (err) {
        setError("Error fetching subcategories");
      }
    };

    if (selectedCategory) {
      fetchSubcategories();
    }
  }, [selectedCategory]);

  const [searchQuery, setSearchQuery] = useState("");

  // const products = [
  //   // Your product data remains unchanged
  // ];

  // const filteredProducts = products.filter(
  //   (product) =>
  //     (!selectedCategory || product.category.includes(selectedCategory)) &&
  //     (!searchQuery ||
  //       product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  // );

  return (
    <div className="category-container-outer my-3">
      <div className="category-container-inner row mx-3">
        <div className="left-nav col-2 position-sticky top-3 my-2">
          <div>
            {/* Display the subcategories dynamically */}
            {error && <p>{error}</p>}
            <h4>Subcategories:</h4>
            <ul className="subcategories-list">
              {subcategories.length > 0 ? (
                subcategories.map((subcategory: any) => (
                  <li key={subcategory.id}>
                    <Link
                      to={`/prod/${subcategory.name}`}
                      className="subcategory-link"
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))
              ) : (
                <p>No subcategories found for this category.</p>
              )}
            </ul>
          </div>
        </div>
        <div className="col-10">
          <h3>{selectedCategory}</h3>
          {/* <div className="row my-2 row-gap-3">
            {filteredProducts.map((product) => (
              <div className="col-3" key={product.id}>
                <ProductCard product={product} height={400} />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
