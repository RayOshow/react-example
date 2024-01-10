import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL, SEARCH_LIST_ITEM_COUNT } from "../constants/constants";
import { SearchListType, SearchQueryParamsType } from "../types/SearchTypes";

/**
 * 검색 결과 리스트를 가지고 옵니다.
 *
 * @returns
 */
const fetchSearchItems = async (
  params: SearchQueryParamsType | Record<string, never>,
): Promise<SearchListType> => {
  try {
    const url = API_BASE_URL + "/search";

    // 쿼리가 없으면 API를 호출하지 않는다.
    if (!params["query"]) {
      const dummySearchList: SearchListType = {
        maxPage: 0,
        totalItems: 0,
        currentPage: 1,
        currentLimit: SEARCH_LIST_ITEM_COUNT,
        next: false,
        items: [],
      };

      return dummySearchList;
    }

    // 페이지가 없으면 기본값으로 설정
    if (!params["page"]) {
      params["page"] = 1;
    }

    // 리밋이 없으면 기본값으로 설정
    if (!params["limit"]) {
      params["limit"] = SEARCH_LIST_ITEM_COUNT;
    }

    const response = await axios.get<SearchListType>(url, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Network error");
  }
};

/**
 * 검색 결과 리스트를 관리 합니다.
 *
 * @returns
 */
export const useSearchItems = (params: SearchQueryParamsType) => {
  // 검색 query를 리액트 쿼리 식별자로 이용합니다.
  // 따라서, 옵션등이 변경될 경우 이전 데이터를 가져오지 못하게 하도록 stale을 0으로 설정합니다.
  return useQuery<SearchListType>(
    ["searchItems", params.query ?? "!!defaultQueryValue!!"],
    () => fetchSearchItems(params),
    {
      staleTime: 0, // 데이터는 항상 stale 상태입니다. 쿼리가 실행될 때마다 데이터를 새로 가져 옵니다.
    },
  );
};
