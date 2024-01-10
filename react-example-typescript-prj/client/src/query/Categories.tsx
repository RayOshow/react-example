import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { CategoryType } from "../types/CommonTypes";

/**
 * 카테고리 정보를 가지고 옵니다.
 *
 * @returns
 */
const fetchCategories = async (): Promise<CategoryType> => {
  try {
    const url = API_BASE_URL + "/categories";
    const response = await axios.get<CategoryType>(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Network error");
  }
};

/**
 * 카테고리 정보를 관리 합니다.
 *
 * @returns
 */
export const useCategories = () => {
  return useQuery<CategoryType>("categories", fetchCategories);
};
