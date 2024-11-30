// App.tsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/customHeader/Header";
import HorizontalNavigation from "./Components/customNavigation/HorizontalNavigation";
import HomePage from "./Components/pages/homePage/homePage";
import CategoryPage from "./Components/pages/category-page/categoryPage";
import ContactUsPage from "./Components/pages/contact-us/contact-us";
import ViewCategories from "./Components/pages/view-categories/view-categories";
import CatNewPage from "./api/cat-new";
import SubcategoryList from "./api/cat-new";
import ProductSearch from "./api/prodBySubcate";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [
    {
      id: 1,
      name: "Office",
      icon: "https://cdn.vectorstock.com/i/500p/58/33/office-furniture-set-vector-4255833.jpg",
      hasSubCategory: true,
    },
    {
      id: 2,
      name: "Library",
      icon: "https://png.pngtree.com/png-vector/20220725/ourmid/pngtree-books-rack-library-furniture-with-shelves-vector-png-image_6066084.png",
      hasSubCategory: true,
    },
    {
      id: 3,
      name: "Schools",
      icon: "https://5.imimg.com/data5/JW/WJ/RA/SELLER-84273756/play-school-furniture.jpg",
      hasSubCategory: true,
    },
    {
      id: 4,
      name: "HouseHold",
      icon: "https://img.freepik.com/free-vector/furniture-icons-set_1284-4237.jpg",
      hasSubCategory: true,
    },
    {
      id: 5,
      name: "Commercial",
      icon: "https://media.istockphoto.com/id/1005460100/vector/isometric-set-of-office-furniture-icons.jpg?s=612x612&w=0&k=20&c=ERHNn9v4iwrjdcz1I4EqocOHgaDDqJShbzjtRoIYuaA=",
      hasSubCategory: true,
    },
    {
      id: 6,
      name: "Auditorium",
      icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
      hasSubCategory: true,
    },
    {
      id: 6,
      name: "Pub",
      icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
      hasSubCategory: true,
    },
    {
      id: 6,
      name: "Retail",
      icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
      hasSubCategory: true,
    },
    {
      id: 6,
      name: "Others",
      icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
      hasSubCategory: true,
    },
  ];

  const banners = [
    {
      id: "1",
      src: "https://cdn.vectorstock.com/i/500p/58/33/office-furniture-set-vector-4255833.jpg",
      alt: "Banner 1",
    },
    {
      id: "2",
      src: "https://5.imimg.com/data5/JW/WJ/RA/SELLER-84273756/play-school-furniture.jpg",
      alt: "Banner 2",
    },
    {
      id: "3",
      src: "https://img.freepik.com/free-vector/furniture-icons-set_1284-4237.jpg",
      alt: "Banner 3",
    },
  ];
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <div className="position-sticky top-0 header-section">
        <Header onSearch={handleSearch} />
        <HorizontalNavigation categories={categories} />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="category/:categoryName" element={<CategoryPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="view-categories" element={<ViewCategories />} />
        <Route path="categ/:categName" element={<SubcategoryList />} />
        <Route path="prod/:subcategName" element={<ProductSearch />} />

      </Routes>
    </BrowserRouter>
  );
};
/*
const App: React.FC = () => {
  // Sample data
  const categories = [
    {
      id: 1,
      name: "Office",
      icon: "https://cdn.vectorstock.com/i/500p/58/33/office-furniture-set-vector-4255833.jpg",
      hasSubCategory: true,
    },
    {
      id: 2,
      name: "Library",
      icon: "https://png.pngtree.com/png-vector/20220725/ourmid/pngtree-books-rack-library-furniture-with-shelves-vector-png-image_6066084.png",
      hasSubCategory: true,
    },
    {
      id: 3,
      name: "Schools",
      icon: "https://5.imimg.com/data5/JW/WJ/RA/SELLER-84273756/play-school-furniture.jpg",
      hasSubCategory: true,
    },
    {
      id: 4,
      name: "HouseHold",
      icon: "https://img.freepik.com/free-vector/furniture-icons-set_1284-4237.jpg",
      hasSubCategory: true,
    },
    {
      id: 5,
      name: "Commercial",
      icon: "https://media.istockphoto.com/id/1005460100/vector/isometric-set-of-office-furniture-icons.jpg?s=612x612&w=0&k=20&c=ERHNn9v4iwrjdcz1I4EqocOHgaDDqJShbzjtRoIYuaA=",
      hasSubCategory: true,
    },
    {
      id: 6,
      name: "Auditorium",
      icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
      hasSubCategory: true,
    },
    {
      id: 6,
      name: "Pub",
      icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
      hasSubCategory: true,
    },
    {
      id: 6,
      name: "Retail",
      icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
      hasSubCategory: true,
    },
    {
      id: 6,
      name: "Others",
      icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
      hasSubCategory: true,
    },
  ];

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
  const banners = [
    {
      id: "1",
      src: "https://cdn.vectorstock.com/i/500p/58/33/office-furniture-set-vector-4255833.jpg",
      alt: "Banner 1",
    },
    {
      id: "2",
      src: "https://5.imimg.com/data5/JW/WJ/RA/SELLER-84273756/play-school-furniture.jpg",
      alt: "Banner 2",
    },
    {
      id: "3",
      src: "https://img.freepik.com/free-vector/furniture-icons-set_1284-4237.jpg",
      alt: "Banner 3",
    },
  ];

  

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory(null); // Reset selected subcategory when a category is selected
  };

  const handleSubCategorySelect = (subCategoryName: string) => {
    setSelectedSubCategory(subCategoryName);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter products based on selected category, subcategory, and search query
  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
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
    <div>
      <div className="position-sticky top-0 header-section">
        <Header onSearch={handleSearch} />
        <HorizontalNavigation
          categories={categories}
          onCategorySelect={handleCategorySelect}
          currentCategory={selectedCategory}
        />
      </div>
      <HomePage />
      <div className="d-flex">
        {selectedCategory && (
          <>
            <LeftNavigation
              subCategories={filteredSubCategories}
              onSubCategorySelect={handleSubCategorySelect}
              currentSubCategory={selectedSubCategory}
            />
            <ProductsLayout products={filteredProducts} />
          </>
        )}
      </div>
      <HomeBanner banners={banners} />
    </div>
  );
};


*/
export default App;
