import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";
import "./Main.css";

function Main() {
  console.log("Main이 렌더링 됐다.");

  // productList라는 상태를 생성하고, 초기값으로 빈 배열([])을 할당합니다.
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({
    brand: 0,
    category: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5001/filter")
      .then((response) => response.json())
      .then((data) => setFilter(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    let uri = "http://localhost:5001/items";

    let separator = "?";

    if (selectedFilter.brand > 0) {
      uri += separator + "brand=Brand" + filter.brand[selectedFilter.brand];
      separator = "&";
    }

    if (selectedFilter.category > 0) {
      uri += separator + "category=" + filter.category[selectedFilter.category];
    }

    fetch(uri)
      .then((response) => response.json())
      .then((data) => setProductList(data))
      .catch((error) => console.error("Error:", error));
  }, [selectedFilter]); // searchKeyword 가 변경될 때마다 API가 재호출 됩니다.

  function handleFilterChange(selectedFilter) {
    setSelectedFilter(selectedFilter);
  }

  return (
    <div className="mainContainer">
      {filter && <Filter filter={filter} onFilterChange={handleFilterChange} />}

      {productList && productList.length > 0 ? (
        <ProductList products={productList} />
      ) : (
        <div className="notFound"> 해당 브랜드의 상품이 없습니다.</div>
      )}
    </div>
  );
}

export default Main;
