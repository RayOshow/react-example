import { useNavigate } from "react-router-dom";
import { priceInKRW } from "../../utils/helper";
import { ProductType, DummyProductType } from "../../types/ProductTypes";

interface ItemCardProps {
  item: ProductType | DummyProductType; // 아이템 정보 or 더미 아이템 정보
}

// 상품 리스트에 표시되는 아이템 카드
export default function ItemCard({ item }: ItemCardProps) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className="flex flex-col gap-2 items-center p-2 cursor-pointer grow basis-full justify-between"
      onClick={() => handleClick(item.id)}
    >
      <div className="h-[220px] flex overflow-hidden bg-gray-100 hover:shadow-lg">
        <img
          src={item.imageUrl}
          alt={item.title}
          className={`m-auto rounded grow`}
        />
      </div>
      <div className="flex flex-col text-xs gap-2 flex-wrap w-full px-2">
        <span className="truncate font-medium text-sm w-full">
          {item.title}
        </span>
        {item.discountPercentage ? (
          <div className="flex flex-col">
            <div className="flex gap-1 items-center">
              <span className="line-through">
                {item.price > 0 && priceInKRW(item.price)}
              </span>
              <span className="text-orange-500 font-medium">
                {item.discountPercentage}% 할인
              </span>
            </div>
            <span>
              {item.price > 0 &&
                priceInKRW(item.price * (1 - item.discountPercentage / 100))}
            </span>
          </div>
        ) : (
          <span className="">{item.price > 0 && priceInKRW(item.price)}</span>
        )}
      </div>
    </div>
  );
}
