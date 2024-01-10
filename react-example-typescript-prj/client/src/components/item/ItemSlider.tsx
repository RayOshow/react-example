import ItemCard from "./ItemCard";
import { ProductType } from "../../types/ProductTypes";
import Slider, { CustomArrowProps } from "react-slick";

const NextArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <div className={`absolute top-32 z-10 w-full`}>
      <i
        className={`absolute fa-solid fa-chevron-right right-4 text-center drop-shadow-md m-auto text-xl text-white hover:text-emerald-300`}
        onClick={onClick}
      ></i>
    </div>
  );
};

const PrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <div className={`absolute top-32 z-10 w-full`}>
      <i
        className={`absolute fa-solid fa-chevron-left left-4 text-center drop-shadow-md m-auto text-xl text-white hover:text-emerald-300`}
        onClick={onClick}
      ></i>
    </div>
  );
};

interface ItemSliderProps {
  items: ProductType[];
  title: string;
}

// 아이템 슬라이드
export default function ItemSlider({ items, title }: ItemSliderProps) {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };

  return (
    <section className="flex flex-col gap-4 items-center">
      <h2 className="basis-1/4 text-2xl text-indigo-600 font-semibold text-center">
        {title}
      </h2>
      <div className="w-full px-8">
        {items && (
          <Slider {...settings}>
            {items.map((item) => (
              <ItemCard item={item} key={item.id} />
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}
