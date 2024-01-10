interface PaginationBarProps {
  maxPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationBar({
  maxPage,
  currentPage,
  setCurrentPage,
}: PaginationBarProps) {
  const pages = new Array(maxPage).fill(1).map((el, idx) => el + idx);
  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ul className="flex m-auto mt-2 text-zinc-400">
      {pages.map((page) => {
        return (
          <li
            key={page}
            className={`p-2 cursor-pointer ${
              currentPage === page && "text-indigo-600 font-medium"
            }`}
            onClick={() => handlePage(page)}
          >
            {page}
          </li>
        );
      })}
    </ul>
  );
}
