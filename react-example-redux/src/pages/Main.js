import { useEffect } from "react";
import ProductList from "../components/ProductList";
import Tab from "../components/Tab";
import { useDispatch, useSelector } from "react-redux";

import "./Main.css";
import { fetchProducts } from "../redux/reducer/ProductSlice";

function Main() {
  const dispatch = useDispatch();

  // 리덕스에서 상태를 가져온다.
  const {
    items: productList,
    loading,
    error,
  } = useSelector((state) => state.products);

  // 상품 리스트를 가져온다.
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

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
