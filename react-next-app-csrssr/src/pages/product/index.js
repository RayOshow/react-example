import { useState, useEffect, useRef } from "react";
import ProductList from "./components/ProductList";
import Filter from "./components/Filter";
import "./product.css";

import Head from 'next/head';

// 서버 데이터를 받아온다.
function product({ serverData }) {
  console.log("Main이 렌더링 됐다.");

  // productList라는 상태를 생성하고, 초기값으로 빈 배열([])을 할당합니다.
  const [productList, setProductList] = useState(serverData.productList);
  const [filter, setFilter] = useState(serverData.filter);
  const [selectedFilter, setSelectedFilter] = useState({
    brand: 0,
    category: 0,
  });

  const isInitialMount = useRef(true);

  useEffect(() => {

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

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
    <>
      <Head>
        <title>Product Page</title>
        <meta name="description" content="이건 상품 리스트 페이지" />
        <meta name="keywords" content="product, website" />
      </Head>
      <div className="mainContainer">
        {filter && <Filter filter={filter} onFilterChange={handleFilterChange} />}

        {productList && productList.length > 0 ? (
          <ProductList products={productList} />
        ) : (
          <div className="notFound"> 해당 브랜드의 상품이 없습니다.</div>
        )}
      </div>
    </>
  );
}

/*
  최초 데이터는 서버에서 실행하여 props로 전달 한다.
  CSR로 이동하더라도 서버 사이드 작업들은 실행 된다.
*/
export async function getServerSideProps(context) {
  console.log('getServerSideProps')
  const serverData = {}

  // 첫 번째 API 호출
  let res = await fetch('http://localhost:5001/filter');
  //const filter = await res.json();
  serverData.filter =  await res.json();

  res = await fetch('http://localhost:5001/items');
  //const filter = await res.json();
  serverData.productList =  await res.json();

  // 페이지 컴포넌트로 props를 통해 데이터 전달
  return { props: { serverData } };
}


export default product;
