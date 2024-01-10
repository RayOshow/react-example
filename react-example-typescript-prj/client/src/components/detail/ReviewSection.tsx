import LoadingIndicator from "../exception/LoadingIndicator";
import PaginationBar from "../common/PaginationBar";
import { makeStarRate } from "../../utils/helper";
import { useProductReviews } from "../../query/ProductReviews";
import { useEffect } from "react";
import { CheckLoadingAndError } from "../../utils/CheckLoadingAndError";
import { ReviewType } from "../../types/ReviewTypes";
import { REVIEW_LIST_ITEM_COUNT } from "../../constants/constants";

interface ReviewSectionProps {
  productId: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function ReviewSection({
  productId,
  currentPage,
  setCurrentPage,
}: ReviewSectionProps) {
  const {
    data: productReview,
    isLoading: isLoadingProductReview = true,
    isError: isErrorProductReview = false,
    refetch: refetchProductReview,
  } = useProductReviews({ id: productId, page: currentPage });

  useEffect(() => {
    refetchProductReview();
  }, [currentPage, refetchProductReview]);

  if (isLoadingProductReview) {
    return <LoadingIndicator />;
  }

  // 카테고리를 기준으로 로딩 / 에러 여부를 체크 한다.
  const loadingOrErrorUI = CheckLoadingAndError(
    isLoadingProductReview,
    null,
    null,
  );
  if (loadingOrErrorUI) {
    return loadingOrErrorUI;
  }

  // 에러가 발생하면 표시 하지 않는다.
  return !isErrorProductReview && productReview ? (
    <div className="mx-12 my-8 px-8 py-4 flex flex-col justify-center gap-6">
      <h4 className="text-lg font-bold text-indigo-600">
        {productReview?.totalItems}개 후기
      </h4>
      <div className="flex flex-col divide-y">
        {productReview?.items?.map((item: ReviewType) => (
          <div key={item.id} className="flex flex-col justify-center py-3">
            <div className="flex gap-4 justify-between">
              <h3 className="text-lg font-semibold">{item.writer}</h3>
              <span>{makeStarRate(item.rating)}</span>
            </div>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
      {productReview?.totalItems > REVIEW_LIST_ITEM_COUNT && (
        <PaginationBar
          maxPage={productReview.maxPage}
          currentPage={productReview.currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  ) : (
    <></>
  );
}

export default ReviewSection;
