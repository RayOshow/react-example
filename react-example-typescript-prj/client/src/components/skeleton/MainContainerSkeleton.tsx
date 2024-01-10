import CategoryTab from "../main/CategoryTab";
import ItemList from "../item/ItemBox";
import skeleton from "../../assets/skeleton.png";
import { MAIN_CATEGORY_NAV_DEFAULT_COUNT } from "../../constants/constants";
import { ProductCategoryType } from "../../types/CommonTypes";
import { DummyProductType } from "../../types/ProductTypes";

interface MainContainerSkeletonProps {
  categories: ProductCategoryType[];
  selectedCategoryId: number;
  setSelectedCategoryId: (newCategory: number) => void;
}

export default function MainContainerSkeleton({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}: MainContainerSkeletonProps) {
  const items: DummyProductType[] = [];

  for (let i = 0; i < MAIN_CATEGORY_NAV_DEFAULT_COUNT; i++) {
    const dummyItem: DummyProductType = {
      id: i,
      title: "",
      discountPrice: 0,
      price: 0,
      discountPercentage: 0,
      imageUrl: skeleton,
    };
    items.push(dummyItem);
  }

  return (
    <section className="flex bg-zinc-100 w-11/12 rounded-lg p-4 gap-2 shadow-lg max-lg:flex-col">
      <CategoryTab
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <div className="mx-auto grow basis-full">
        <ItemList items={items} />
      </div>
    </section>
  );
}
