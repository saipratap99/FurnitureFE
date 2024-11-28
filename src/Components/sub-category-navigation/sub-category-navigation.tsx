// LeftNavigation.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SubCategory } from "../../types/subcategory.model";
import "./style.css";
import { SetURLSearchParams } from "react-router-dom";

interface Props {
  subCategories: SubCategory[];
  onSubCategorySelect: (subCategoryName: string) => void;
  currentSubCategory: string | null;
  setSearchParams: SetURLSearchParams;
}
const SubCategoryNavigation: React.FC<Props> = ({
  subCategories,
  onSubCategorySelect,
  currentSubCategory,
  setSearchParams,
}) => {
  const handleSubCategoryClick = (subCategoryName: string) => {
    onSubCategorySelect(subCategoryName);
    setSearchParams("subCategory=" + subCategoryName);
    // window.history.replaceState(
    //   null,
    //   subCategoryName,
    //   "subCategory=" + subCategoryName
    // );
  };
  return (
    <div className="sub-category-panel rounded">
      <ul className="sub-category-list">
        {subCategories.map((subCategory) => (
          <li className="sub-category-item">
            <button
              key={subCategory.id}
              onClick={() => handleSubCategoryClick(subCategory.name)}
              className={`sub-category-btn ${
                subCategory.name === currentSubCategory
                  ? "active-sub-category"
                  : ""
              }`}
            >
              {subCategory.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategoryNavigation;
