import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Search from "../components/Search";
import "./main.css";

function Main() {
  console.log("Main이 렌더링 됐다.");

  const [productList, setProductList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(null);

  useEffect(() => {
    let uri = "http://localhost:5001/items";

    if (searchKeyword) {
      uri += "?brand=" + searchKeyword;
    }

    fetch(uri)
      .then((response) => response.json())
      .then((data) => setProductList(data))
      .catch((error) => console.error("Error:", error));
  }, [searchKeyword]);

  function searchMethod(keyword) {
    setSearchKeyword(keyword);
  }

  return (
    <div className="mainContainer">
      <Search onSearch={searchMethod} />
      {productList && productList.length > 0 ? (
        <ProductList products={productList} />
      ) : (
        <div className="notFound"> 해당 브랜드의 상품이 없습니다.</div>
      )}
    </div>
  );
}

export default Main;
