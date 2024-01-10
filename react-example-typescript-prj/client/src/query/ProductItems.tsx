import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { ProductListType, ProductListRequestType } from "../types/ProductTypes";

/**
 * 상품 리스트를 가지고 옵니다.
 *
 * @returns
 */
const fetchProductItems = async (
  params: ProductListRequestType,
): Promise<ProductListType> => {
  try {
    const url = API_BASE_URL + "/products";

    // 페이지가 없으면 기본값으로 설정
    if (!params["page"]) {
      params["page"] = 1;
    }

    // 리밋이 없으면 기본값으로 설정
    if (!params["limit"]) {
      params["limit"] = 12;
    }

    const response = await axios.get<ProductListType>(url, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Network error");
  }
};

/**
 * 상품 리스트 정보를 관리 합니다.
 *
 * @returns
 */
export const useProductItems = (params: ProductListRequestType) => {
  return useQuery<ProductListType>(["productItems", params.category], () =>
    fetchProductItems(params),
  );
};
