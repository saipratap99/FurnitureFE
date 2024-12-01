// LeftNavigation.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SubCategory } from "../../types/subcategory.model";

interface Props {
  subCategories: SubCategory[];
  onSubCategorySelect: (subCategoryName: string) => void;
  currentSubCategory: string | null;
}
const LeftNavigation: React.FC<Props> = ({
  subCategories,
  onSubCategorySelect,
  currentSubCategory,
}) => {
  const handleSubCategoryClick = (subCategoryName: string) => {
    onSubCategorySelect(subCategoryName);
    
  };

  return (
    <div className="list-group overflow-auto m-2 mh-100">
      {subCategories.map((subCategory) => (
        <button
          key={subCategory.id}
          onClick={() => handleSubCategoryClick(subCategory.name)}
          className={`list-group-item list-group-item-action ${
            subCategory.name === currentSubCategory ? "active" : ""
          }`}
        >
          {subCategory.name}
        </button>
      ))}
    </div>
  );
};

export default LeftNavigation;
