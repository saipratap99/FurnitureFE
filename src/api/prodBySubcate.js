import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductSearch = () => {
    const {subcategName}=useParams()
    const subCategoryName=subcategName;
    // const [subCategoryName, setSubCategoryName] = useState("");
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        if (!subCategoryName.trim()) {
            setError("Please enter a subcategory name.");
            setProducts([]);
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:5194/api/v1/Product/GetBySubCategoryName/${subCategoryName}`
            );
            setProducts(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "An error occurred while fetching products."
            );
            setProducts([]);
        }
    };

    return (
        <div className="container my-4">
            <h1 className="text-center">Products by SubCategory</h1>
            <div className="mb-3">
                {/* <label htmlFor="subcategoryName" className="form-label">
                    Enter SubCategory Name:
                </label> */}
                {/* <input
                    type="text"
                    className="form-control"
                    id="subcategoryName"
                    placeholder="e.g., Furniture"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                /> */}
            </div>
            <button className="btn btn-primary" onClick={fetchProducts}>
                Get Products
            </button>

            <div id="productsContainer" className="mt-4">
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {products.length > 0 && (
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Is Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.description || "N/A"}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.isActive ? "Yes" : "No"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* {products.length === 0 && !error && (
                    <div className="alert alert-warning" role="alert">
                        No products found for the given subcategory.
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default ProductSearch;
