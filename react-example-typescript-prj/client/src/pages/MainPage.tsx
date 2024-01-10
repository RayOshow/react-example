import { lazy, useEffect, useState } from "react";
import allCategoryImg from "../assets/all_category.png";
import { AUTO_SWITCH_INTERVAL } from "../constants/constants";
import { useRankingItems } from "../query/RankingItems";
import { useProductItems } from "../query/ProductItems";
import { useRecommendItems } from "../query/RecommendItems";
import { useCategories } from "../query/Categories";
import { CheckLoadingAndError } from "../utils/CheckLoadingAndError";

// 스켈레톤 컴포넌트
const MainContainerSkeleton = lazy(
  () => import("../components/skeleton/MainContainerSkeleton"),
);
const MainContainer = lazy(() => import("../components/main/MainContainer"));
const ItemSlider = lazy(() => import("../components/item/ItemSlider"));

export default function MainPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  // 리액트 쿼리 : 카테고리 가져오기
  const {
    data: categories,
    isLoading: islLoadingCategories = true,
    isError: isErrorCategories = false,
    error: errorCategoriesMsg = null,
  } = useCategories();

  // 리액트 쿼리 : 상품 리스트 데이터 가져오기
  const {
    data: productItems,
    isLoading: isLoadingProductItems = true,
    isError: isErrorProductItems = false,
    refetch: refetchProductItems,
  } = useProductItems({ category: selectedCategoryId });

  // 리액트 쿼리 : 랭킹 데이터 가져오기
  const {
    data: rankingItems,
    isLoading: isLoadingRankingItems = true,
    isError: isErrorRankingItems = false,
  } = useRankingItems({});

  // 리액트 쿼리 : 추천 상품 리스트 데이터 가져오기
  const {
    data: recommendItems,
    isLoading: isLoadingRecommendItems = true,
    isError: isErrorRecommendItems = false,
  } = useRecommendItems({});

  // 카테고리가 변경되면 리액트 쿼리를 통해 새롭게 아이템을 가져 온다.
  useEffect(() => {
    refetchProductItems();
  }, [selectedCategoryId, refetchProductItems]);

  // 카테고리가 변경 되면, 타임아웃이 재설정됩니다.
  useEffect(() => {
    if (!categories || islLoadingCategories || isErrorCategories) {
      return;
    }

    const timeoutId = setTimeout(() => {
      if (selectedCategoryId < categories.product.length - 1) {
        setSelectedCategoryId((prevId) => prevId + 1);
      } else {
        setSelectedCategoryId(0);
      }
    }, AUTO_SWITCH_INTERVAL);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedCategoryId, categories, islLoadingCategories, isErrorCategories]);

  const changeCategory = (newCategory: number) => {
    setSelectedCategoryId(newCategory);
  };

  // 카테고리를 기준으로 로딩 / 에러 여부를 체크 한다.
  const loadingOrErrorUI = CheckLoadingAndError(
    islLoadingCategories,
    isErrorCategories,
    errorCategoriesMsg,
  );
  if (loadingOrErrorUI) {
    return loadingOrErrorUI;
  }

  return (
    <main className="flex flex-col items-center p-4 gap-8 w-5/6 m-auto max-md:w-full">
      {!isLoadingProductItems &&
      !isErrorProductItems &&
      categories &&
      productItems &&
      productItems?.items?.length > 0 ? (
        <MainContainer
          categories={[
            { id: 0, category: "All", title: "전체", imageUrl: allCategoryImg },
            ...categories.product,
          ]}
          items={productItems.items}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={changeCategory}
        />
      ) : (
        // 상품 리스트는 로딩중 or 로딩/에러 발생 상황에서 스켈레톤 이미지를 노출 시킵니다.
        categories && (
          <MainContainerSkeleton
            categories={[
              {
                id: 0,
                category: "All",
                title: "전체",
                imageUrl: allCategoryImg,
              },
              ...categories.product,
            ]}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
          />
        )
      )}
      {/* 상품 슬라이드 영역 입니다. */}
      <div className="flex flex-col gap-4 w-full m-8">
        {/* 랭킹&추천 데이터는 로딩/에러 발생 시 카드 자체를 노출 시키지 않습니다. */}
        {!isLoadingRankingItems && !isErrorRankingItems && rankingItems && (
          <ItemSlider items={rankingItems.items} title="실시간 랭킹" />
        )}
        {!isLoadingRecommendItems &&
          !isErrorRecommendItems &&
          recommendItems && (
            <ItemSlider items={recommendItems.items} title="당신을 위한 추천" />
          )}
      </div>
    </main>
  );
}
