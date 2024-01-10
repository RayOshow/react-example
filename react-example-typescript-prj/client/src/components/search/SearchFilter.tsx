import { useState } from "react";
import { SearchRadioGroupType } from "../../types/SearchTypes";
import SearchFilterInput from "./SearchFilterInput";

interface SearchFilterProps {
  title: string; // 필터명
  name: string; // Input 그룹핑 명칭
  items: SearchRadioGroupType[]; // Input에 사용될 아이템들
  formatLabel: (item: SearchRadioGroupType) => string; // 아이템 종류에 따른 아이템명 변경 함수.
  checked: number | null | undefined; // 체크된 인풋 정보
  handleFilter: (name: string, id: number) => void; // 인풋 이벤트 발생 시 핸들러
}

// 항목별 검색 필터입니다.
const SearchFilter = ({
  title,
  name,
  items,
  formatLabel,
  checked,
  handleFilter,
}: SearchFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex flex-col gap-2 p-1 cursor-pointer basis-full">
      <div
        className="flex justify-between py-2 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl text-indigo-600 shrink-0">{title}</h2>
        <i className={`fa-solid fa-chevron-${isOpen ? "up" : "down"}`} />
      </div>
      {isOpen && (
        <fieldset className="flex flex-col gap-2 px-4 pb-4">
          <SearchFilterInput
            id={0}
            name={name}
            checked={checked ? false : true}
            handleFilter={handleFilter}
          >
            전체
          </SearchFilterInput>
          {items.map((item: SearchRadioGroupType) => (
            <SearchFilterInput
              id={item.id}
              name={name}
              key={item.id}
              checked={Number(checked) === item.id ? true : false}
              handleFilter={handleFilter}
            >
              {formatLabel(item)}
            </SearchFilterInput>
          ))}
        </fieldset>
      )}
    </section>
  );
};

export default SearchFilter;
