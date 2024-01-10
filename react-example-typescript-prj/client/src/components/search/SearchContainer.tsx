import { CategoryType } from "../../types/CommonTypes";
import SearchFilterList from "./SearchFilterList";
import SearchResultList from "./SearchResultList";
import PaginationBar from "../common/PaginationBar";
import { SEARCH_LIST_ITEM_COUNT } from "../../constants/constants";

import {
  SearchListType,
  SearchFilterParamsType,
  UpdateParamsFunctionType,
} from "../../types/SearchTypes";

interface SearchContainerProps {
  categories: CategoryType | undefined; // 카테고리 정보
  searcFilterItems: SearchFilterParamsType; // 필터리스트에 표시될 정보
  handleChangeCategory: (newParams: UpdateParamsFunctionType) => void; // 필터가 변경될 때 실행될 메소드
  searchItems: SearchListType | undefined; // 검색 결과 리스트
  currentPage: number; // 검색 페이징 번호
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 검색 페이지가 변경될 때 사용될 메소드
}

export default function SearchContainer({
  categories,
  searcFilterItems,
  handleChangeCategory,
  searchItems,
  currentPage,
  setCurrentPage,
}: SearchContainerProps) {
  return (
    <main className="flex flex-row w-11/12 max-lg:flex-col max-lg:w-full m-auto">
      {/* 검색 필터 영역 */}
      {categories && (
        <SearchFilterList
          searchParams={searcFilterItems}
          changeCategory={handleChangeCategory}
          searchFilter={categories.searchFilter}
          productCategories={categories.product}
        />
      )}
      {/* 검색 결과 영역 */}
      <div className="p-6 flex flex-col gap-2 justify-between basis-full">
        {searchItems && searchItems?.items?.length ? (
          <>
            {/* 검색 결과 리스트 */}
            <SearchResultList searchItems={searchItems} />
            {/* 페이징 표시 - 총 아이템 수가 1page 이상인 경우만 노출.*/}
            {searchItems?.totalItems > SEARCH_LIST_ITEM_COUNT && (
              <PaginationBar
                maxPage={searchItems.maxPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="basis-full flex justify-center items-center">
            <h3 className="h-[400px] flex justify-center items-center text-xl">
              검색어에 해당하는 상품이 없습니다. 😢
            </h3>
          </div>
        )}
      </div>
    </main>
  );
}
