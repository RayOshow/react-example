import { PurchaseStatusType } from "../types/ProductTypes";
import { AgeType, ChartDataType } from "../types/CommonTypes";
import { CHART_BASE_DATA } from "../constants/constants";

export const priceInKRW = (num: number): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(num);
};

export const makeStarRate = (num: number): string => {
  let result = "";
  for (let i = 0; i < num; i++) {
    result = result + "⭐️";
  }
  return result;
};

/**
 * 차트 데이터를 만듭니다.
 */
export const makeChartData = (
  data: PurchaseStatusType,
  key: keyof PurchaseStatusType,
  types: AgeType[] | null,
): ChartDataType => {
  // 기본 설정은 성별값을 기준으로 합니다.
  let colors = CHART_BASE_DATA.GENDER_COLORS;
  let labels = CHART_BASE_DATA.GENDER_LABELS;

  /**
   * 나이 타입의 차트인 경우, 나이 데이터로 값을 변경합니다.
   */
  if (key === "age" && types) {
    // 값, 인덱스 배열 형태로 만든 후 값이 가장 큰 항목을 찾아 해당 인덱스값('[1]')을 리턴합니다.
    const findMaxArg = (arr: Array<number>): number =>
      arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];

    // 기본 컬러를 배열 형태로 지정합니다.
    colors = Object.values(data[key]).map(() => CHART_BASE_DATA.AGE_COLOR);
    // 가장 나이가 많은 항목의 경우 다른 색을 지정 합니다.
    colors[findMaxArg(Object.values(data[key]))] =
      CHART_BASE_DATA.AGE_MAX_COLOR;
    // AgeType배열에서 동일한 id가 있는지 찾고 있으면 해당 description 값을 가져 옵니다.
    labels = Object.keys(data[key]).map(
      (key) => types.find((val) => val.type === key)?.description ?? "Unknown",
    );
  }

  return {
    labels,
    datasets: [
      {
        label: String(key),
        data: Object.values(data[key]),
        backgroundColor: colors,
      },
    ],
  };
};
