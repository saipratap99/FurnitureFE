// HorizontalNavigation.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Category } from "../../types/category.model";
import { useLocation } from "react-router-dom";
import "./style.css";

interface Props {
  categories: Category[];
}

const HorizontalNavigation: React.FC<Props> = ({ categories }) => {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  const splitLocation = pathname.split("/");
  console.log("splited", splitLocation);

  const categoryName =
    splitLocation.length === 3 && splitLocation[1] === "category"
      ? splitLocation[2]
      : undefined;

  return (
    <div
      className="d-flex justify-content-center bg-white category-navigation-header"
      role="group"
      aria-label="Category navigation"
    >
      {categories.map((category) => (
        <div className="category-item">
          <a
            href={"/category/" + category.name}
            className={
              "justify-content-center btn border-none d-flex mx-0 px-3 " +
              (category.name === categoryName ? "active-category" : "")
            }
            key={category.id}
          >
            {category.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default HorizontalNavigation;
