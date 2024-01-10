import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { RecommendListByIdType } from "../types/RecommendTypes";

/**
 * 상품 기반 추천 상품 리스트를 가져 옵니다.
 *
 * @returns
 */
const fetchRecommendItemsById = async (
  id: number,
): Promise<RecommendListByIdType> => {
  try {
    const url = API_BASE_URL + `/recommendation/${id}`;

    const response = await axios.get<RecommendListByIdType>(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Network error");
  }
};

/**
 * 상품 기반 추천 상품 리스트를 관리 합니다.
 *
 * @returns
 */
export const useRecommendItemsById = (id: number) => {
  return useQuery<RecommendListByIdType>(["recommendItemsById", id], () =>
    fetchRecommendItemsById(id),
  );
};
