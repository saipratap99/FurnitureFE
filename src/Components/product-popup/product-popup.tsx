import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import { getSubCategories } from "../../api/sub-category";
import { getProductTags } from "../../api/product-tag";
interface ProductPopupProps {
  show: boolean;
  handleClose: any;
  productData: any;
  handleSave: any;
}
const ProductPopup = ({
  show,
  handleClose,
  productData,
  handleSave,
}: ProductPopupProps) => {
  const [product, setProduct] = useState<any>({
    name: "",
    description: "",
    isActive: false,
    quantity: 0,
    price: 0,
    subCategoryId: "",
    productImages: [],
    productTags: [],
  });

  useEffect(() => {
    getSubCategories().then((data) => setSubCategories(data));
    getProductTags().then((data) => setProductTags(data));
  }, []);

  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [productTags, setProductTags] = useState<any[]>([]);

  useEffect(() => {
    // Populate product data when editing
    if (productData) {
      setProduct({
        ...productData,
        productTags: productData.productTags || [],
        productImages: productData.productImages || [],
      });
    }
  }, [productData]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMultiSelectChange = (e: any) => {
    const options = Array.from(e.target.selectedOptions).map(
      (option: any) => option.value
    );
    setProduct({ ...product, productTags: options });
  };
  const handleImageChange = (index: any, value: any) => {
    const updatedImages = [...product.productImages];
    updatedImages[index] = value;
    setProduct({ ...product, productImages: updatedImages });
  };

  const handleAddImage = () => {
    setProduct({
      ...product,
      productImages: [...product.productImages, ""],
    });
  };

  const handleRemoveImage = (index: any) => {
    const updatedImages = product.productImages.filter(
      (_: any, i: any) => i !== index
    );
    setProduct({ ...product, productImages: updatedImages });
  };

  const handleSubmit = () => {
    handleSave(product);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {productData ? "Edit Product" : "Create Product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Active</Form.Label>
                <Form.Check
                  type="checkbox"
                  name="isActive"
                  label="Is Active"
                  checked={product.isActive}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sub-Category</Form.Label>
            <Form.Select
              name="subCategoryId"
              value={product.subCategoryId}
              onChange={handleChange}
            >
              <option value="">Select a Sub-Category</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Tags</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={product.productTags}
              onChange={handleMultiSelectChange}
            >
              {productTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Images</Form.Label>
            {product.productImages.map((image: any, index: any) => (
              <InputGroup className="mb-2" key={index}>
                <Form.Control
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Enter image URL"
                />
                <Button
                  variant="danger"
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove
                </Button>
              </InputGroup>
            ))}
            <Button variant="primary" onClick={handleAddImage}>
              Add Image
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductPopup;
