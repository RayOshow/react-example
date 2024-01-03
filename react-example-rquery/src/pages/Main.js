// import { useEffect } from "react";
import ProductList from "../components/ProductList";
import Tab from "../components/Tab";

import "./Main.css";

import { useItems } from "../query/Items";
import { useFavorite } from '../query/Favorite';

function Main() {

  const { data: favorite } = useFavorite();

  const {
    data: productList = null,
    isLoading: loading = true,
    isError: error = false,
  } = useItems(favorite);

  return (
    <div className="mainContainer">
      <Tab />
      {loading && <div className="exception">Loading...</div>}
      {error && <div className="exception">Error: 문제가 발생 했습니다.</div>}
      {!loading &&
        !error &&
        (productList && productList.length > 0 ? (
          <ProductList products={productList} />
        ) : (
          <div className="exception">해당 브랜드의 상품이 없습니다.</div>
        ))}
    </div>
  );
}

export default Main;
