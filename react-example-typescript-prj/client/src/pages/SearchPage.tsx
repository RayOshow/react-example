import { useSearchParams } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { SEARCH_FILTER_BASE } from "../constants/constants";
import { useSearchItems } from "../query/SearchItems";
import { useCategories } from "../query/Categories";
import { CheckLoadingAndError } from "../utils/CheckLoadingAndError";
import LoadingIndicator from "../components/exception/LoadingIndicator";
import {
  SearchQueryParamsType,
  SearchFilterParamsType,
  UpdateParamsFunctionType,
} from "../types/SearchTypes";
import {
  SearchPriceFilterType,
  SearchDiscountFilterType,
} from "../types/CommonTypes";

const SearchContainer = lazy(
  () => import("../components/search/SearchContainer"),
);

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searcFilterItems, setSearcFilterItems] = useState({});
  const query = searchParams.get("query");
  const [searhQueryParams, setSearchQueryParams] = useState({});

  // 리액트 쿼리 : 카테고리 가져오기
  const {
    data: categories,
    isLoading: islLoadingCategories = true,
    isError: isErrorCategories = false,
    error: errorCategoriesMsg = null,
  } = useCategories();

  // 리액트 쿼리 : 검색결과 가져오기
  const {
    data: searchItems,
    isLoading: islLoadingSearchItems = true,
    isError: isErrorSearchItems = false,
    error: errorSearchItemsMsg = null,
    refetch: refetchSearchItems,
  } = useSearchItems(searhQueryParams);

  useEffect(() => {
    // searhQueryParams이 변경 되면, API를 재 호출하여 새로운 검색 결과를 가져 옵니다.

    refetchSearchItems();
  }, [searhQueryParams, refetchSearchItems]);

  // 검색필더 or 페이징 번호가 변경되면, 해당 정보를 기반으로 검색을 재 호출 합니다.
  useEffect(() => {
    // 카테고리 정보를 정상적으로 가져온 경우에만 실시 합니다.
    if (!islLoadingCategories) {
      let category = Number(searchParams.get("category"));
      let price = Number(searchParams.get("price"));
      let discount = Number(searchParams.get("discount"));
      const queryParams: SearchQueryParamsType = { query: null, page: 1 };

      const _searcFilterItems: SearchFilterParamsType = {
        price: SEARCH_FILTER_BASE.PRICE,
        category: SEARCH_FILTER_BASE.CATEGORY,
        discount: SEARCH_FILTER_BASE.DISCOUNT,
      };

      if (price && !isNaN(price)) {
        // 가격 에러 체크
        if (price < 1) {
          price = 1;
        }

        // URL 쿼리 파라미터에 설정된 가격 정보는 카테고리의 검색필터 아이디 기준입니다.
        // API 호출 시에는 검색필터에 설정된 range값을 적절하게 설정해야 합니다.
        const range = categories
          ? categories.searchFilter.price.find(
              (item: SearchPriceFilterType) => item.id === Number(price),
            )
          : null;

        if (range) {
          queryParams["minPrice"] = range.min;
          queryParams["maxPrice"] = range.max;
        }
        _searcFilterItems["price"] = price;
      }

      if (category && !isNaN(category)) {
        if (category < 1) {
          category = SEARCH_FILTER_BASE.CATEGORY;
        }

        queryParams["category"] = category;
        _searcFilterItems["category"] = category;
      }

      if (discount && !isNaN(discount)) {
        // 할인율 에러 체크
        if (discount < 1) {
          discount = SEARCH_FILTER_BASE.DISCOUNT;
        }

        // URL 쿼리 파라미터에 설정된 할인 정보는 카테고리의 검색필터 아이디 기준입니다.
        // API 호출 시에는 검색필터에 설정된 range값을 적절하게 설정해야 합니다.
        const range = categories
          ? categories.searchFilter.discount.find(
              (item: SearchDiscountFilterType) => item.id === Number(discount),
            )
          : null;

        if (range) {
          queryParams["minDiscount"] = range.min;
          queryParams["maxDiscount"] = range.max;
        }
        _searcFilterItems["discount"] = discount;
      }

      if (query) {
        queryParams["query"] = query;
        queryParams["page"] = currentPage;

        // 검색어가 정상적으로 URL 쿼리에 있는 경우에만 SearchQueryParams을 변경합니다.
        // SearchQueryParams가 변경 되면 자동으로 refetch가 됩니다.
        setSearchQueryParams(queryParams);
      }

      // 필터 렌더링 시에 사용될 표시 정보를 URL 쿼리 파라미터를 기준으로 설정 합니다.
      setSearcFilterItems(_searcFilterItems);
    }
  }, [
    islLoadingCategories,
    categories,
    searchParams,
    currentPage,
    query,
    setSearchQueryParams,
  ]);

  const handleChangeCategory = (params: UpdateParamsFunctionType) => {
    // 필터가 변경되면 새로운 조건으로 검색을 실시하기 때문에, 페이징도 기본 값으로 돌아가야 합니다.
    setCurrentPage(1);
    setSearchParams(params);
  };

  // 카테고리, 검색 결과를 기준으로 로딩 / 에러 여부를 체크 합니다.
  const loadingOrErrorUI = CheckLoadingAndError(
    islLoadingCategories || islLoadingSearchItems,
    isErrorCategories || isErrorSearchItems,
    errorCategoriesMsg || errorSearchItemsMsg,
  );

  if (loadingOrErrorUI) {
    return loadingOrErrorUI;
  }

  return (
    <>
      <Suspense fallback={<LoadingIndicator />}>
        <SearchContainer
          categories={categories}
          searcFilterItems={searcFilterItems}
          handleChangeCategory={handleChangeCategory}
          searchItems={searchItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Suspense>
    </>
  );
}
