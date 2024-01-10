import { ReactNode } from "react";

interface SearchFilterInputProps {
  id: number;
  name: string;
  children: ReactNode; // SearchFilterInput 사이에 위치한 태그입니다.
  checked: boolean; // 설정 여부 입니다.
  handleFilter: (name: string, id: number) => void; // 이벤트 발생 시 실행되는 메소드 입니다.
}

// 검색 필터 인풋입니다.
const SearchFilterInput = ({
  id,
  name,
  children,
  checked,
  handleFilter,
}: SearchFilterInputProps) => (
  <div className="flex gap-1 text-sm">
    <input
      type="radio"
      id={`${name}_${id}`}
      name={name}
      checked={checked}
      // 인풋에 텍스트 입력란이 없다면 onClick 이벤트를 사용해도 무관 합니다.
      onChange={() => handleFilter(name, id)}
    />
    <label htmlFor={`${name}_${id}`}>{children}</label>
  </div>
);

export default SearchFilterInput;
