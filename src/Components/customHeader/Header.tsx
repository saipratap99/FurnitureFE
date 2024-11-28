// Header.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

interface Props {
  onSearch: (query: string) => void;
}

const Header: React.FC<Props> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg justify-content-between navbar-light position-sticky top-0">
      <a className="navbar-brand brand-font" href="/">
        FurnitureCity
      </a>
      <form className="form-inline my-2 my-lg-0 w-50">
        <input
          className="form-control mr-sm-2"
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          aria-label="Search"
        />
      </form>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">
            About Us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/contact-us">
            Contact Us
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="#">
            Order Now
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default Header;
