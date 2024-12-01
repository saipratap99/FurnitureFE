import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { editProduct, getProducts, postProduct } from "../../../api/product";
import ProductPopup from "../../product-popup/product-popup";
import Toaster from "../../toaster/toaster";

const ViewProducts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState<any[]>([]);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState<string>("");
  const [toasterColor, setToasterColor] = useState<string>("bg-success");

  useEffect(() => {
    getProducts().then((data) =>
      setProducts(
        data?.map((prod: any) => {
          return {
            id: prod["id"],
            name: prod["name"],
            description: prod["description"],
            isActive: prod["isActive"] || false,
            quantity: prod["quantity"],
            price: prod["price"],
            subCategoryId: prod["subCategory"]?.["id"],
            productImages: prod["images"]?.map((img: any) => img["imageUrl"]),
            productTags: prod["tags"]?.map((tag: any) => tag["id"]),
          };
        })
      )
    );
  }, []);
  const handleOpenPopup = (product: any) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setShowPopup(false);
  };

  const handleSave = (product: any) => {
    console.log("product", product);

    if (product.id) {
      editProduct(product.id, product)
        .then((data) => {
          setShowToaster(true);
          setToasterMessage(data);
          setProducts(products.map((p) => (p.id === product.id ? product : p)));
          setTimeout(() => {
            setShowToaster(false);
          }, 3000);
        })
        .catch((err) => {
          setShowToaster(true);
          setToasterMessage("Failed to update product.");
          setToasterColor("bg-danger");
          setTimeout(() => {
            setShowToaster(false);
          }, 3000);
        });
    } else {
      postProduct(product)
        .then((data) => {
          console.log("product saved", data);
          setShowToaster(true);
          setToasterMessage(data);
          setProducts([...products, product]);
          setTimeout(() => {
            setShowToaster(false);
          }, 3000);
        })
        .catch((err) => {
          setShowToaster(true);
          setToasterMessage("Failed to create product.");
          setToasterColor("bg-danger");
          setTimeout(() => {
            setShowToaster(false);
          }, 3000);
        });
    }
  };

  return (
    <div className="container mt-4">
      {showToaster && <Toaster message={toasterMessage} color={toasterColor} />}
      <h1>Products</h1>
      <Button className="mb-3" onClick={() => handleOpenPopup(null)}>
        Create Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>IsActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>
              <td>{product.isActive ? "True" : "False"}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleOpenPopup(product)}
                  className="me-2"
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showPopup && (
        <ProductPopup
          show={showPopup}
          handleClose={handleClosePopup}
          productData={selectedProduct}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default ViewProducts;
