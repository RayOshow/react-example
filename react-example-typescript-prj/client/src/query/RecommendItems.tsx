import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import {
  RecommendListType,
  RecommendRequestType,
} from "../types/RecommendTypes";

/**
 * 추천 아이템 리스트를 가져 옵니다.
 *
 * @returns
 */
const fetchRecommendItems = async (
  params: RecommendRequestType | Record<string, never>,
): Promise<RecommendListType> => {
  try {
    const url = API_BASE_URL + "/recommendation";
    const response = await axios.get<RecommendListType>(url, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Network error");
  }
};

/**
 * 추천 아이템 리스트를 관리 합니다.
 *
 * @returns
 */
export const useRecommendItems = (
  params: RecommendRequestType | Record<string, never>,
) => {
  return useQuery<RecommendListType>("recommendItems", () =>
    fetchRecommendItems(params),
  );
};
