import CategoryTab from "./CategoryTab";
import ItemBox from "../item/ItemBox";
import { ProductCategoryType } from "../../types/CommonTypes";
import { ProductType } from "../../types/ProductTypes";

interface MainContainerProps {
  categories: ProductCategoryType[];
  items: ProductType[];
  selectedCategoryId: number;
  setSelectedCategoryId: (newCategory: number) => void;
}

export default function MainContainer({
  categories,
  items,
  selectedCategoryId,
  setSelectedCategoryId,
}: MainContainerProps) {
  return (
    <section className="flex bg-zinc-100 w-11/12 rounded-lg p-4 gap-2 shadow-lg max-lg:flex-col">
      <CategoryTab
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <div className="mx-auto grow basis-full">
        {items && items.length > 0 ? <ItemBox items={items} /> : <></>}
      </div>
    </section>
  );
}
