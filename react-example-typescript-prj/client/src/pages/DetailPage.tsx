import { useState } from "react";
import { useParams } from "react-router-dom";

import ProductDetail from "../components/detail/ProductDetail";
import ItemSlider from "../components/item/ItemSlider";
import ReviewsSection from "../components/detail/ReviewSection";
import ChartSection from "../components/detail/ChartSection";
import Modal from "../components/common/Modal";
import ScrollToTopButton from "../components/common/ScrollToTop";

import { useProductDetail } from "../query/ProductDetail";
import { useCategories } from "../query/Categories";
import { useRecommendItemsById } from "../query/RecommendItemsById";
import { CheckLoadingAndError } from "../utils/CheckLoadingAndError";

export default function DetailPage() {
  const productId = useParams().productId;
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");

  // 리액트 쿼리 : 카테고리 가져오기
  const {
    data: categories,
    isLoading: islLoadingCategories = true,
    isError: isErrorCategories = false,
    error: errorCategoriesMsg = null,
  } = useCategories();

  // 리액트 쿼리 : 상품 상세 데이터 가져오기
  const {
    data: productDetail,
    isLoading: isLoadingProductDetail = true,
    isError: isErrorProductDetail = false,
    error: errorProductDetailMsg = null,
  } = useProductDetail(Number(productId));

  // 리액트 쿼리 : 추천 상품 가져오기
  const {
    data: recommendItems,
    isLoading: isLoadingRecommendItems = true,
    isError: isErrorRecommendItems = false,
  } = useRecommendItemsById(Number(productId));

  // 이미지 클릭 함수.
  const handleClickModal = (imgUrl: string) => {
    setModalUrl(imgUrl);
    setModalOpen(true);
  };

  // 카테고리/ 리스트 아이템을 기준으로 로딩 / 에러 여부를 체크 한다.
  const loadingOrErrorUI = CheckLoadingAndError(
    islLoadingCategories || isLoadingProductDetail,
    isErrorCategories || isErrorProductDetail,
    errorCategoriesMsg || errorProductDetailMsg,
  );

  if (loadingOrErrorUI) {
    return loadingOrErrorUI;
  }

  return (
    <main className="w-4/5 mx-auto max-lg:w-full p-4 shadow-md my-6">
      {/* 상품 상세 + 차트 데이터 */}
      {productDetail && (
        <>
          <ProductDetail
            item={productDetail}
            handleClickModal={handleClickModal}
          />
          <ChartSection categories={categories} productDetail={productDetail} />
        </>
      )}
      {/* 구매 리뷰  */}
      <ReviewsSection
        productId={Number(productId)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* 추천 상품 */}
      {!isLoadingRecommendItems && !isErrorRecommendItems && recommendItems && (
        <ItemSlider items={recommendItems.items} title="연관된 추천 상품" />
      )}
      {/* 이미지 모달 */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={modalUrl}
      />
      {/* 탑으로 이동 */}
      <ScrollToTopButton />
    </main>
  );
}
