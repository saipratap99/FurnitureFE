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
import Login from "./user-flow/login";
import Register from "./user-flow/register";
import secureLocalStorage from "react-secure-storage";
import { getCategories } from "./api/category";
import UserHome from "./user-flow/user-home";
import Footer from "./user-flow/footer";

import ViewSubCategories from "./Components/pages/view-subcategories/view-subcategories";
import ViewProductTags from "./Components/pages/view-product-tags/view-product-tags";
import ViewLeads from "./Components/pages/view-leads/view-leads";
import AdminDashboard from "./Components/pages/admin/admin";
import ViewUsers from "./Components/pages/view-users/view-users";
import ViewProducts from "./Components/pages/view-products/view-products";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUser] = useState<any>(null);

  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  // console.log("userId",user)

  // getCategories().then((data) => setCategoriesList(data));
  // const categories = [
  //   {
  //     id: 1,
  //     name: "Office",
  //     icon: "https://cdn.vectorstock.com/i/500p/58/33/office-furniture-set-vector-4255833.jpg",
  //     hasSubCategory: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Library",
  //     icon: "https://png.pngtree.com/png-vector/20220725/ourmid/pngtree-books-rack-library-furniture-with-shelves-vector-png-image_6066084.png",
  //     hasSubCategory: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Schools",
  //     icon: "https://5.imimg.com/data5/JW/WJ/RA/SELLER-84273756/play-school-furniture.jpg",
  //     hasSubCategory: true,
  //   },
  //   {
  //     id: 4,
  //     name: "HouseHold",
  //     icon: "https://img.freepik.com/free-vector/furniture-icons-set_1284-4237.jpg",
  //     hasSubCategory: true,
  //   },
  //   {
  //     id: 5,
  //     name: "Commercial",
  //     icon: "https://media.istockphoto.com/id/1005460100/vector/isometric-set-of-office-furniture-icons.jpg?s=612x612&w=0&k=20&c=ERHNn9v4iwrjdcz1I4EqocOHgaDDqJShbzjtRoIYuaA=",
  //     hasSubCategory: true,
  //   },
  //   {
  //     id: 6,
  //     name: "Auditorium",
  //     icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
  //     hasSubCategory: true,
  //   },
  //   {
  //     id: 6,
  //     name: "Pub",
  //     icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
  //     hasSubCategory: true,
  //   },
  //   {
  //     id: 6,
  //     name: "Retail",
  //     icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
  //     hasSubCategory: true,
  //   },
  //   {
  //     id: 6,
  //     name: "Others",
  //     icon: "https://www.syonaroots.com/images/Institutional%20Furniture/Auditorium/auditorium-ergonomic-chairs-india.jpeg",
  //     hasSubCategory: true,
  //   },
  // ];

  // const banners = [
  //   {
  //     id: "1",
  //     src: "https://cdn.vectorstock.com/i/500p/58/33/office-furniture-set-vector-4255833.jpg",
  //     alt: "Banner 1",
  //   },
  //   {
  //     id: "2",
  //     src: "https://5.imimg.com/data5/JW/WJ/RA/SELLER-84273756/play-school-furniture.jpg",
  //     alt: "Banner 2",
  //   },
  //   {
  //     id: "3",
  //     src: "https://img.freepik.com/free-vector/furniture-icons-set_1284-4237.jpg",
  //     alt: "Banner 3",
  //   },
  // ];
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <div className="position-sticky top-0 header-section">
        <Header />

        <>
          <HorizontalNavigation categories={categoriesList} />
        </>
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

        {/* <Route path="view-subcategories" element={<ViewSubCategories />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="user-home" element={<UserHome />} />
        <Route path="view-subcategories" element={<ViewSubCategories />} />
        <Route path="view-product-tags" element={<ViewProductTags />} />
        <Route path="view-leads" element={<ViewLeads />} />
        <Route path="view-users" element={<ViewUsers />} />
        <Route path="view-products" element={<ViewProducts />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Routes>
      <div>{/* <Footer/> */}</div>
    </BrowserRouter>
  );
};

export default App;
