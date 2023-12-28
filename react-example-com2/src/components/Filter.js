import { useState } from "react";
import "./Filter.css"; // CSS 파일 임포트

function Filter({ filter, onFilterChange }) {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleBrandChange = (index) => {
    setSelectedBrand(index);
    onFilterChange({ brand: index, category: selectedCategory });
  };

  const handleCategoryChange = (index) => {

    setSelectedCategory(index);
    onFilterChange({ brand: selectedBrand, category: index });
  };

  return (
    <div className="filter-container">
      {/* 브랜드 필터 */}
      <div className="filter-item">
        <h3>브랜드</h3>
        {filter.brand.map((brand, index) => (
          <label key={brand}>
            <input
              type="radio"
              value={brand}
              checked={selectedBrand === index}
              onChange={() => handleBrandChange(index)}
            />
            {brand}
          </label>
        ))}
      </div>

      {/* 카테고리 필터 */}
      <div className="filter-item">
        <h3>카테고리</h3>
        {filter.category.map((category, index) => (
          <label key={category}>
            <input
              type="radio"
              value={category}
              checked={selectedCategory === index}
              onChange={() => handleCategoryChange(index)}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Filter;
