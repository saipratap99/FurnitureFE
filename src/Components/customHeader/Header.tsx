// Header.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import secureLocalStorage from "react-secure-storage";


interface Props {
  onSearch?: (query: string) => void;
}

const Header: React.FC<Props> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
const userId=secureLocalStorage.getItem("userId")
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // onSearch(event.target.value);
  };
const logOut=()=>{
  secureLocalStorage.removeItem("userId")
}
  return (
    <nav className="navbar navbar-expand-lg justify-content-between navbar-light position-sticky top-0">
      <a className="navbar-brand brand-font" href="/">
        FurnitureStore
      </a>
      <form className="form-inline my-2 my-lg-0 w-50">
        {/* <input
          className="form-control mr-sm-2"
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          aria-label="Search"
        /> */}
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
{!userId?<><li className="nav-item">
          <a className="nav-link" href="/login">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/register">
            Register
          </a>
        </li>
        </>:<><li className="nav-item">
          <a onClick={logOut} className="nav-link" href="/login">
            Logout
          </a>
        </li></>}


      </ul>
    </nav>
  );
};

export default Header;
