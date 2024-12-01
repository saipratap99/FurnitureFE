import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Nav, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { getCategories } from "../api/category";
import Header from "../Components/customHeader/Header";
import HorizontalNavigation from "../Components/customNavigation/HorizontalNavigation";
import Footer from "./footer";

const UserHome: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  // Fetch data from the backend
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse, subcategoriesResponse] = await Promise.all([
          axios.get("http://localhost:5194/api/v1/Product"), // Replace with your endpoint
          axios.get("http://localhost:5194/api/v1/Category"), // Replace with your endpoint
          axios.get("http://localhost:5194/api/v1/SubCategory"), // Replace with your endpoint
        ]);
console.log("products",productsResponse.data)
console.log("categories",categoriesResponse.data)

console.log("subcate",subcategoriesResponse.data)
getCategories().then((data) => setCategoriesList(data));
// console.log("products",productsResponse.data)

        setProducts(productsResponse.data);

        setCategories(categoriesResponse.data);
        setSubcategories(subcategoriesResponse.data);
        setFilteredProducts(subcategoriesResponse.data); // Initial load
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(""); // Reset subcategory selection
    const filteredSubs = subcategories.filter((sub) => sub.categoryId === categoryId);
    setFilteredSubcategories(filteredSubs);

    // Display all products under the selected category
    const filteredProds = products.filter((product) => product.categoryId === categoryId);
    setFilteredProducts(filteredProds);
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);

    // Display products under the selected subcategory
    const filteredProds = products.filter((product) => product.subcategoryId === subcategoryId);
    setFilteredProducts(filteredProds);
  };

  return (
    <div>
      {/* Top Navbar */}

       <><HorizontalNavigation categories={categoriesList} /></>
      {/* <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Furniture Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {categories.map((category) => (
                <Nav.Link
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  active={selectedCategory === category.id}
                >
                  {category.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      <Container fluid>
        <Row>
          {/* Side Navbar for Subcategories */}
          <Col md={2} className="bg-light p-3">
            <h5>Subcategories</h5>
            <ListGroup>
              {filteredSubcategories.map((sub) => (
                <ListGroup.Item
                  key={sub.id}
                  action
                  onClick={() => handleSubcategorySelect(sub.id)}
                  active={selectedSubcategory === sub.id}
                >
                  {sub.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* Main Content for Products */}
          <Col md={10}>
            <Row className="mt-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Col md={4} lg={3} sm={6} key={product.id} className="mb-4">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={product.imageUrl || "https://via.placeholder.com/150"}
                        alt={product.name}
                      />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                          <strong>Price:</strong> ${product.price}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="text-center mt-5">No products available.</p>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
     
    </div>
  );
};

export default UserHome;
