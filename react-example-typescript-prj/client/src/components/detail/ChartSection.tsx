import LoadingIndicator from "../exception/LoadingIndicator";
import { Suspense, lazy } from "react";
import { CategoryType } from "../../types/CommonTypes";
import { makeChartData } from "../../utils/helper";
import { ProductDetailType } from "../../types/ProductTypes";

const AgeChart = lazy(() => import("../chart/AgeChart"));
const GenderChart = lazy(() => import("../chart/GenderChart"));

interface ChartSectionProps {
  categories: CategoryType | undefined;
  productDetail: ProductDetailType;
}

// 상품 차트 데이터를 보여 줍니다.
function ChartSection({ categories, productDetail }: ChartSectionProps) {
  return (
    <div className="flex gap-8 justify-center p-6 flex-wrap">
      <Suspense fallback={<LoadingIndicator />}>
        <div className="flex flex-col gap-6 text-xl font-semibold">
          <h2 className="px-2">연령</h2>
          {categories && (
            <AgeChart
              data={makeChartData(
                productDetail.purchaseStatus,
                "age",
                categories.ageType,
              )}
            />
          )}
        </div>
        <div className="flex flex-col gap-6 text-xl font-semibold">
          <h2 className="px-2">성별</h2>
          <GenderChart
            data={makeChartData(productDetail.purchaseStatus, "gender", null)}
          />
        </div>
      </Suspense>
    </div>
  );
}

export default ChartSection;
