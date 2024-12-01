import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Carousel from "../../base-elements/carousel/carousel";
import ProductsCarouselLayout from "../../products-carousel/productsCarousel";
import FormPopUp from "../../formsPopUp/forms-pop-up";
import HorizontalNavigation from "../../customNavigation/HorizontalNavigation";
import { getCategories } from "../../../api/category";

const HomePage = () => {
  const [products, setProducts] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [subcategories, setSubcategories] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse, subcategoriesResponse] =
          await Promise.all([
            axios.get("http://localhost:5194/api/v1/Product"),
            axios.get("http://localhost:5194/api/v1/Category"),
            axios.get("http://localhost:5194/api/v1/SubCategory"),
          ]);
        console.log(productsResponse.data);
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setSubcategories(subcategoriesResponse.data);
        setFilteredProducts(productsResponse.data);

        // Fetch categories for the navigation bar
        getCategories().then((data) => setCategoriesList(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter products based on selected category and subcategory
    // const filterProducts = () => {
    //   const filtered = products.filter((product:any) => {
    //     const matchesCategory =
    //       selectedCategory === "" || product.category.includes(selectedCategory);
    //     const matchesSubcategory =
    //       selectedSubcategory === "" || product.subCategory === selectedSubcategory;
    //     return matchesCategory && matchesSubcategory;
    //   });
    //   setFilteredProducts(filtered);
    // };
    // filterProducts();
  }, [selectedCategory, selectedSubcategory, products]);

  const handleModalSubmit = (data: any) => {
    console.log("Form Data Submitted:", data);
  };

  const slides = [
    "https://t3.ftcdn.net/jpg/05/16/06/88/240_F_516068886_8qTU3oZW9QPgXXyavzx3j90qxLYeWYcr.jpg",
    "https://www.stickley.com/cdn/shop/files/YearEndBlowout24_NSYR_SFM_IB_Homepage-MartineSideboard.jpg?v=1732629671&width=3840",
    "https://cdn.media.amplience.net/i/shadesoflight/XU_Cat3",
  ];

  return (
    <div>
      {/* Horizontal Navigation */}
      <HorizontalNavigation categories={categoriesList} />

      {/* Carousel */}
      <Carousel slides={slides} height={400} />

      {/* Open Modal Button */}
      <FormPopUp
        show={showModal}
        title="Create Product"
        handleClose={() => setShowModal(false)}
        handleSubmit={handleModalSubmit}
        formElements={[
          {
            label: "Name",
            name: "name",
            type: "text",
            placeholder: "Enter your name",
            required: true,
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            required: true,
          },
          {
            label: "Age",
            name: "age",
            type: "number",
            placeholder: "Enter your age",
          },
        ]}
      />

      {/* Products Carousel Layout */}
      <ProductsCarouselLayout
        products={filteredProducts}
        isImages={true}
        images={[]}
        heading="Hot Collections"
      />
      <ProductsCarouselLayout
        products={filteredProducts}
        isImages={true}
        images={[]}
        heading="Best Deals"
      />
      <ProductsCarouselLayout
        products={filteredProducts}
        isImages={true}
        images={[]}
        heading="Trending"
      />
    </div>
  );
};

export default HomePage;
