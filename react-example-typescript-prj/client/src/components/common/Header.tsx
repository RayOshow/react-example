import { useNavigate } from "react-router-dom";
import logo from "../../assets/coz_logo_192.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    // 페이지 이동 시 검색어 초기화
    if (!location.pathname.includes("search")) {
      setQuery("");
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);
  const handleSearch = () => {
    if (query) {
      navigate(`/search?query=${query}`);
    }
  };

  const handleFocus = () => {
    if (query === "검색어를 입력하세요") {
      setQuery(""); // 입력 필드에 포커스가 있을 때, 기본 텍스트 제거
    }
  };

  const handleLogoClick = () => {
    setQuery("");
    navigate(`/`);
  };

  return (
    <header className="flex justify-around items-center py-4 sticky top-0 z-10 shadow-lg bg-white max-sm:flex-col gap-4 h-fit cursor-pointer">
      <div className="flex items-center gap-4 " onClick={handleLogoClick}>
        <img alt="logo" src={logo} className="w-9" />
        <h1 className="text-xl font-semibold max-sm:text-md">COZ SHOPPING</h1>
      </div>
      <label className="relative block">
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white rounded-full pr-9 pl-5 py-2 shadow-md focus:outline-none focus:ring-indigo-400 focus:ring-1 text-sm w-64"
          placeholder="원하는 상품을 찾아보세요!"
          type="text"
          name="search"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <span
          className="absolute inset-y-0 right-2 flex items-center p-2 cursor-pointer"
          onClick={handleSearch}
        >
          <i className="fa-solid fa-magnifying-glass text-indigo-500 hover:text-emerald-500 m-auto"></i>
        </span>
      </label>
    </header>
  );
}
