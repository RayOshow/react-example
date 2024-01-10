import { ProductCategoryType } from "../../types/CommonTypes";

interface CategoryTabProps {
  categories: ProductCategoryType[];
  selectedCategoryId: number;
  setSelectedCategoryId: (newCategory: number) => void;
}

export default function CategoryTab({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoryTabProps) {
  return (
    <div className="grow shrink-0 mr-2">
      <ul className="flex flex-col gap-1 text-lg font-medium">
        {categories.map((item) => (
          <li
            key={item.id}
            className={`flex items-center justify-between py-2 px-3 gap-20 rounded-lg transition-transform duration-200 ease-in-out cursor-pointer ${
              selectedCategoryId === item.id
                ? "bg-emerald-500 text-white scale-110 shadow-md"
                : "text-indigo-600"
            }`}
            onClick={() => setSelectedCategoryId(item.id)}
          >
            <img
              className="w-8 h-8 object-cover rounded-full shadow-lg"
              alt={item.category}
              src={item.imageUrl}
            />
            <span className="shrink-0">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
