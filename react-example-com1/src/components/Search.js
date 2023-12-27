import React, { useState } from 'react';
import './Search.css'; // CSS 파일 임포트

const SearchComponent = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={keyword}
        onChange={handleInputChange}
        placeholder="정확한 브랜드명 입력(BrandA/B/C)"
      />
      <button className="search-button" onClick={handleSearch}>브랜드 검색</button>
    </div>
  );
};

export default SearchComponent;
