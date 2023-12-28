import React from 'react';
import './ProductList.css'; // CSS 파일 임포트

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.brand} : {product.category}</p>
    </div>
  );
};

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
