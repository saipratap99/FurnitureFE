import { FC, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./style.css";
import SubCategoryNavigation from "../../sub-category-navigation/sub-category-navigation";
import ProductCard from "../../product-card/productCard";
interface CategoryPageProps {}

const CategoryPage: FC<CategoryPageProps> = () => {
  const { categoryName } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = categoryName;

  const products = [
    {
      id: 6232,
      name: "Computed or Laptop Table",
      description: "CLT1215",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Table+Laptop+white+1A.jpg", // Library chair
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Table+Laptop+white+1B.jpg", // Another angle
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Tables",
    },
    {
      id: 1232,
      name: "Safe Blue",
      description: "SB101",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Safe+case+1A.jpg", // Library chair
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Safe+case+1B.jpg", // Another angle
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Safe+case+1C.jpg", // Another angle
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Safes",
    },
    {
      id: 3252,
      name: "Office Working Chair",
      description: "OWC1211",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Office+chair+1A.jpg", // Library chair
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Office+chair+1B.jpg", // Another angle
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Chair",
    },
    {
      id: 1252,
      name: "Safe Grey",
      description: "SG1321",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Safe+case+Grey+1A.jpg", // Library chair
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Safe+case+Grey+1B.jpg", // Another angle
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Safes",
    },

    {
      id: 5252,
      name: "Computed or Laptop Table",
      description: "CLT1211",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Table+Laptop+plain+1A.jpg", // Library chair
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Table+Laptop+plain+1B.jpg", // Another angle
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Tables",
    },
    {
      id: 6252,
      name: "Magazine Display Rack",
      description: "MDS1611",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Magazine+1A.jpg", // Library chair
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Magazine+1B.jpg", // Another angle
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Magazine Display Racks",
    },
    {
      id: 3252,
      name: "Premium - Office Chair",
      description: "POWC1211",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Office+chair+3A.png", // Library chair
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Chair",
    },
    {
      id: 93631,
      name: "Office table with racks",
      description: "OR105",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Table+with+cupboard+1A.jpg",
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Table+with+cupboard+1B.jpg",
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Table+with+cupboard+1C.jpg",
      ],
      price: 76000,
      category: ["Office"],
      subCategory: "Tables",
    },
    {
      id: 5,
      name: "Conference Table",
      description: "P105",
      imagesURLs: [
        "https://images.unsplash.com/photo-1556761175-b413da4baf72", // Large conference table
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0", // Another conference setting
      ],
      price: 76000,
      category: ["Office"],
      subCategory: "Tables",
    },
    {
      id: 3252,
      name: "Premium - Office Chair Z",
      description: "POWC1211",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Office+chair+2A.webp", // Library chair
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Chair",
    },
    {
      id: 7,
      name: "Auditorium Lighting",
      description: "P107",
      imagesURLs: [
        "https://images.unsplash.com/photo-1556761175-b413da4baf72", // Auditorium lighting
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93", // Another lighting setup
      ],
      price: 67000,
      category: ["Auditorium"],
      subCategory: "Lighting",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const subCategories = [
    {
      id: 1,
      name: "Chair",
      category: ["Library", "Office", "Schools", "Auditorium"],
    },
    { id: 2, name: "Desk", category: ["Office", "Schools", "Library"] },
    { id: 3, name: "Bookshelves", category: ["Library", "HouseHold"] },
    { id: 4, name: "Tables", category: ["Commercial", "Office"] },
    {
      id: 5,
      name: "Projectors",
      category: ["Office", "Schools", "Auditorium", "Commercial"],
    },
    { id: 6, name: "Couch", category: ["HouseHold", "Library", "Commercial"] },
    {
      id: 7,
      name: "Whiteboard",
      category: ["Schools", "Office", "Commercial"],
    },
    { id: 8, name: "Sound System", category: ["Auditorium", "Commercial"] },
    { id: 9, name: "Decorations", category: ["HouseHold"] },
    { id: 10, name: "Lighting", category: ["Auditorium", "Commercial"] },
  ];

  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    searchParams.get("subCategory")
  );

  const handleSubCategorySelect = (subCategoryName: string) => {
    setSelectedSubCategory(subCategoryName);
  };

  // Filter products based on selected category, subcategory, and search query
  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category.includes(selectedCategory)) &&
      (!selectedSubCategory || product.subCategory === selectedSubCategory) && // Updated line
      (!searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter subcategories based on selected category
  const filteredSubCategories = subCategories.filter(
    (subCategory) =>
      !selectedCategory || subCategory.category.includes(selectedCategory)
  );

  return (
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
            {filteredProducts.map((product) => {
              return (
                <div className="col-3">
                  <ProductCard product={product} height={400} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
