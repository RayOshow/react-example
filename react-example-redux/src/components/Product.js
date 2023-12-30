import { useState } from "react";
import Star from "./Star";
import "./Product.css"; // CSS 파일 임포트
import { toggleFavorite } from "../redux/reducer/ProductSlice";
import { useDispatch } from "react-redux";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleFavoriteClick = () => {
    // '찜하기' 누르면 리덕스 상태를 바꾼다.
    dispatch(toggleFavorite(product.id));
  };

  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>
        {product.brand} : {product.category}
      </p>

      <div className="star-container">
        <span>찜하기:</span>
        <Star isFavorite={product.favorite} onClick={handleFavoriteClick} />
      </div>
    </div>
  );
};

export default Product;
