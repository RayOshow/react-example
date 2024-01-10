import ItemBox from "../item/ItemBox";
import { SearchListType } from "../../types/SearchTypes";

interface SearchResultListProps {
  searchItems: SearchListType; // 검색 결과 리스트
}

// 검색 결과 리스트를 표시 합니다.
const SearchResultList = ({ searchItems }: SearchResultListProps) => (
  <div className="basis-full">
    <h3 className="self-start text-lg pl-6 font-semibold text-zinc-500 ">
      {searchItems.totalItems}개 결과
    </h3>
    <ItemBox items={searchItems.items} />
  </div>
);

export default SearchResultList;
