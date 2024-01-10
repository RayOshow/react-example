import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL, REVIEW_LIST_ITEM_COUNT } from "../constants/constants";
import { ReviewListType, ReviewRequestType } from "../types/ReviewTypes";
/**
 * 상품 구매 리뷰 정보를 가져옵니다.
 *
 * @returns
 */
const fetchProductReviews = async (
  params: ReviewRequestType,
): Promise<ReviewListType> => {
  try {
    const { id, ...restParams } = params;
    const url = API_BASE_URL + `/purchase/review/${id}`;

    // 페이지가 없으면 기본값으로 설정
    if (!restParams["page"]) {
      restParams["page"] = 1;
    }

    // 리밋이 없으면 기본값으로 설정
    if (!restParams["limit"]) {
      restParams["limit"] = REVIEW_LIST_ITEM_COUNT;
    }

    const response = await axios.get<ReviewListType>(url, {
      params: restParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Network error");
  }
};

/**
 * 상품 리뷰 정보를 관리 합니다.
 *
 * @returns
 */
export const useProductReviews = (params: ReviewRequestType) => {
  // 페이지 번호 이동 시 새로운 데이터를 가져오기 위해 stale 시간을 0으로 설정합니다.
  return useQuery<ReviewListType>(
    "productReview",
    () => fetchProductReviews(params),
    {
      staleTime: 0, // 데이터는 항상 stale 상태입니다. 쿼리가 실행될 때마다 데이터를 새로 가져 옵니다.
    },
  );
};

// productReview -> 상품 100개 페이지 100개 = 1만개의 쿼리 생성
