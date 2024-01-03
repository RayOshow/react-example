import Star from "./Star";
import "./Product.css"; // CSS 파일 임포트
import { useUpdateItem } from "../query/Items";

const Product = ({ product }) => {
  const updateItemsMutation = useUpdateItem();

  const handleFavoriteClick = () => {
    // props를 직접 변경하지는 않습니다.
    const _product = {...product}
    _product.favorite = !_product.favorite;
    updateItemsMutation.mutate(_product)
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
