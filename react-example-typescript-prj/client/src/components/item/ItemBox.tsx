import ItemCard from "./ItemCard";
import { ProductType, DummyProductType } from "../../types/ProductTypes";

interface ItemBoxProps {
  items: ProductType[] | DummyProductType[]; // 상품 리스트 or 더미 상품 리스트
}

// 그리드 형태로 표시 하는 아이템 리스트
export default function ItemBox({ items }: ItemBoxProps) {
  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 basis-4/5 h-min bg-white p-2 rounded shadow-xs rounded-md">
      {items.map((item) => (
        <ItemCard item={item} key={item.id} />
      ))}
    </div>
  );
}
