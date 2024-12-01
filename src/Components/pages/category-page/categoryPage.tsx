import { FC, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./style.css";
import SubCategoryNavigation from "../../sub-category-navigation/sub-category-navigation";
import ProductCard from "../../product-card/productCard";
import axios from "axios";
import { getCategories } from "../../../api/category";
import HorizontalNavigation from "../../customNavigation/HorizontalNavigation";
import secureLocalStorage from "react-secure-storage";
interface CategoryPageProps {}

const CategoryPage: FC<CategoryPageProps> = () => {
  const { categoryName } = useParams();
  console.log(categoryName)
  const [products, setProducts] = useState<any>([]);
  const [categories, setCategories] = useState<any>([  ]);
  const [subcategories, setSubcategories] = useState<any>([]);
  const [cart, setCart] = useState<any[]>([]);

  // const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = categoryName;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse, subcategoriesResponse] = await Promise.all([
          axios.get("http://localhost:5194/api/v1/Product"), 
          axios.get("http://localhost:5194/api/v1/Category"),
          axios.get("http://localhost:5194/api/v1/SubCategory"),
        ]);
console.log("products",productsResponse.data)
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setSubcategories(subcategoriesResponse.data);
        // setFilteredProducts(productsResponse.data)

        // Fetch categories for the navigation bar
        // getCategories().then((data) => setCategories(data));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

// Add a product to the cart
const handleAddToCart = (product: any) => {
  setCart((prevCart) => {
    const existingProduct = prevCart.find((item) => item.id === product.id);
    if (existingProduct) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};

// Remove a product from the cart or decrement its quantity
const handleRemoveFromCart = (productId: any) => {
  setCart((prevCart) =>
    prevCart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

// Place order
const handlePlaceOrder = async () => {
  try {
    const orderDetails = cart.map((item) => ({
      quantity: item.quantity,
      productId: item.id,
      // userId:secureLocalStorage.getItem("userId")
    }));

    const response = await axios.post(
      "http://localhost:5194/api/v1/Order/Create",
      orderDetails
    );
    console.log("Order placed successfully:", response.data);
    alert("Order placed successfully!");
    setCart([]); // Clear the cart
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place the order. Please try again.");
  }
};


  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    searchParams.get("subCategory")
  );

  const handleSubCategorySelect = (subCategoryName: string) => {
    setSelectedSubCategory(subCategoryName);
  };

  // Filter products by selected category name
const filteredProducts = products.filter(
  (product: any) =>
    product.subCategory.categories.some(
      (category: any) => category.name === selectedCategory
    )
);

// Filter subcategories based on selected category name
const filteredSubCategories = subcategories.filter(
  (subCategory: any) =>
    subCategory.categories.some(
      (category: any) => category.name === selectedCategory
    )
);

  return (
    <>
    <HorizontalNavigation categories={categories} />
    <div className="category-container-outer my-3">
      <div className="category-container-inner row mx-3">
        <div className="left-nav col-2 position-sticky top-3 my-2">
       
          <div>
            <SubCategoryNavigation
              subCategories={filteredSubCategories}
              onSubCategorySelect={handleSubCategorySelect}
              currentSubCategory={selectedSubCategory}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
        <div className="col-10">
          <h3>{selectedSubCategory ? selectedSubCategory : "All Products"}</h3>
          <div className="row my-2 row-gap-3">
            {filteredProducts.map((product:any) => {
              return (
                <div className="col-3">
                  <ProductCard product={product} height={400} onAddToCart={handleAddToCart}/>
                </div>
              );
            })}
          </div>
        </div>
        {/* Cart Section */}
        <div className="col-3">
            <div className="cart-container p-3 border rounded shadow-sm">
              <h4>Cart</h4>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="list-unstyled">
                  {cart.map((item) => (
                    <li key={item.id} className="my-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{item.name}</strong>
                          <p className="mb-0">${item.price}</p>
                        </div>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {cart.length > 0 && (
                <div className="mt-3">
                  <h5>
                    Total: $
                    {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                  </h5>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              )}
            </div>
            </div>
      </div>
    </div>
    </>
  );
};

export default CategoryPage;
