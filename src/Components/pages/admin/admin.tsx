import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Optional CSS for styling

const AdminDashboard = () => {
  const navigate = useNavigate();

  const sections = [
    { name: "Categories", path: "/view-categories" },
    { name: "Sub-Categories", path: "/view-subcategories" },
    { name: "Products", path: "/view-products" },
    { name: "Product Tags", path: "/view-product-tags" },
    { name: "Leads", path: "/view-leads" },
    { name: "Users", path: "/view-users" },
    { name: "Orders", path: "/view-orders" },
  ];

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <div className="row">
        {sections.map((section) => (
          <div key={section.name} className="col-md-4 mb-3">
            <div
              className="card text-center p-3 admin-box"
              onClick={() => navigate(section.path)}
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h5>{section.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
