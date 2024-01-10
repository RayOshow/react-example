import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { ProductDetailType } from "../types/ProductTypes";

/**
 * 상품 상세 정보를 가지고 옵니다.
 *
 * @returns
 */
const fetchProductDetail = async (id: number): Promise<ProductDetailType> => {
  try {
    const url = API_BASE_URL + `/detail/${id}`;
    const response = await axios.get<ProductDetailType>(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Network error");
  }
};

/**
 * 상품 상세 정보 관리 합니다.
 *
 * @returns
 */
export const useProductDetail = (id: number) => {
  return useQuery<ProductDetailType>(["productDetail", id], () =>
    fetchProductDetail(id),
  );
};
