import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { RankingListType, RankingRequestType } from "../types/RankingTypes";

/**
 * 랭킹 아이템을 가지고 옵니다.
 * @returns
 */
const fetchRankingItems = async (
  params: RankingRequestType | Record<string, never>,
): Promise<RankingListType> => {
  try {
    const url = API_BASE_URL + "/ranking";
    const response = await axios.get<RankingListType>(url, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Network error");
  }
};

/**
 *
 * @returns
 */
export const useRankingItems = (
  params: RankingRequestType | Record<string, never>,
) => {
  return useQuery<RankingListType>("rankingItems", () =>
    fetchRankingItems(params),
  );
};
