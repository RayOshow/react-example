import { priceInKRW } from "../../utils/helper";
import { ProductDetailType } from "../../types/ProductTypes";

interface ProductDetailProps {
  item: ProductDetailType; // 상품 상세 정보
  handleClickModal: (imgUrl: string) => void; // 이미지 클릭시 모달창 띄우는 메소드
}

// 상품 상세 정보를 표시 합니다.
export default function ProductDetail({
  item,
  handleClickModal,
}: ProductDetailProps) {
  const handleClickImage = () => {
    handleClickModal(item.imageUrl);
  };

  return (
    <div className="flex justify-center mx-auto p-4 max-md:flex-col">
      <div
        className="basis-1/3 w-40 p-4 max-md:w-full flex items-center cursor-zoom-in bg-gray-100"
        onClick={handleClickImage}
      >
        <img src={item.imageUrl} alt={item.title} />
      </div>
      <div className="p-4 basis-2/3 shrink-0 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-8">
          <div className="text-xl flex flex-col gap-2">
            <p className="text-indigo-600">상품 정보</p>
            {/* <p className='text-2xl'>{item.title}</p> */}
            <div
              className="detail-info"
              dangerouslySetInnerHTML={{ __html: item.info }}
            ></div>
          </div>
          <div className="flex text-lg divide-x text-center border rounded p-4">
            <p className="px-2 flex flex-col basis-full">
              <span className="text-indigo-500">판매량</span>
              <span>
                {item.purchaseStatus.totalSales.toLocaleString("ko-KR")}
              </span>
            </p>
            <p className="px-2 flex flex-col basis-full">
              <span className="text-indigo-500">좋아요 수</span>
              <span>{item.like.toLocaleString("ko-KR")}</span>
            </p>
            <p className="px-2 flex flex-col basis-full">
              <span className="text-indigo-500">구매 만족도</span>
              <span>{item.purchaseStatus.satisfaction} / 5.0</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <div className="flex gap-1 items-center">
              <span className="line-through">{priceInKRW(item.price)}</span>
              <span className="text-orange-500 font-medium">
                {item.discountPercentage}% 할인
              </span>
            </div>
            <span className="text-2xl text-indigo-600">
              {priceInKRW(item.price * (1 - item.discountPercentage / 100))}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              disabled
              className="bg-black px-4 py-3 text-white rounded basis-full"
            >
              장바구니 담기
            </button>
            <button
              disabled
              className="bg-indigo-600 px-4 py-3 text-white rounded basis-full"
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
