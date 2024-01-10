import {
  SearchFilterParamsType,
  UpdateParamsFunctionType,
  SearchInfoFilterType,
} from "../../types/SearchTypes";
import { ProductCategoryType } from "../../types/CommonTypes";
import { URLSearchParams } from "url";
import SearchFilter from "./SearchFilter";

interface SearchFilterListProps {
  searchParams: SearchFilterParamsType; // 검색 필터 인풋 선택 정보
  changeCategory: (newParams: UpdateParamsFunctionType) => void; // 검색 필터 변경 시 사용될 메소드
  productCategories: ProductCategoryType[]; // 검색 필터 1 구성 정보
  searchFilter: SearchInfoFilterType; // 검색 필터 2~3 구성 정보
}

// 다수의 검색 필터를 구성 합니다.
export default function SearchFilterList({
  searchParams,
  changeCategory,
  productCategories,
  searchFilter,
}: SearchFilterListProps) {
  const priceInKRW = (num: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(num);
  };

  const handleInit = () => {
    changeCategory((currentParams) => {
      currentParams.delete("price");
      currentParams.delete("discount");
      currentParams.delete("category");
      return currentParams;
    });
  };

  const handleFilter = (type: string, id: number) => {
    changeCategory((currentParams: URLSearchParams) => {
      if (id) {
        currentParams.set(type, String(id));
      } else {
        currentParams.delete(type);
      }
      return currentParams;
    });
  };

  return (
    <aside className="flex flex-col p-6 gap-4 justify-between mx-lg:block">
      <div className="flex flex-col divide-y divide-zinc-200 bg-white relative top-0">
        <SearchFilter
          title="상품별"
          name="category"
          items={productCategories}
          formatLabel={(item) => item.title || ""}
          checked={searchParams["category"]}
          handleFilter={handleFilter}
        />
        <SearchFilter
          title="가격별"
          name="price"
          items={searchFilter.price}
          formatLabel={(item) =>
            item.min && item.max
              ? `${priceInKRW(item.min)} - ${priceInKRW(item.max)}`
              : ""
          }
          checked={searchParams["price"]}
          handleFilter={handleFilter}
        />
        <SearchFilter
          title="할인별"
          name="discount"
          items={searchFilter.discount}
          formatLabel={(item) => `${item.min}% - ${item.max}%`}
          checked={searchParams["discount"]}
          handleFilter={handleFilter}
        />
      </div>
      <div className="flex gap-2 justify-center">
        <button
          className="bg-emerald-500 w-full py-2 rounded-md text-white text-xl"
          onClick={handleInit}
        >
          초기화
        </button>
      </div>
    </aside>
  );
}
