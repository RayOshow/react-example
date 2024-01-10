import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 핸들러
  const toggleVisibility = () => {
    if (document.documentElement.scrollTop > 300) {
      // 300px 이상 스크롤되면 버튼 표시
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 버튼 클릭 시 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return isVisible ? (
    <button
      onClick={scrollToTop}
      style={{ right: "10vw" }}
      className="fixed bottom-10 bg-blue-500 hover:bg-blue-900 text-white font-bold py-4 px-6 rounded-full"
    >
      맨 위로
    </button>
  ) : (
    <></>
  );
};

export default ScrollToTopButton;
