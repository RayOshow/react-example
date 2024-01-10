// 공통 타입
/////////////////////////////////////////////
export interface PaginationType {
  maxPage: number;
  currentPage: number;
}

export interface PaginationResponse {
  maxPage: number;
  totalItems: number;
  currentPage: number;
  currentLimit: number;
  next: boolean;
}
/////////////////////////////////////////////

// 카테고리
export interface ProductCategoryType {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
}

export interface RecomType {
  id: number;
  type: string;
}

export interface AgeType {
  id: number;
  type: string;
  description: string;
}

export interface SearchPriceFilterType {
  id: number;
  min: number;
  max: number;
}

export interface SearchDiscountFilterType {
  id: number;
  min: number;
  max: number;
}
export interface SearchFiltersType {
  price: SearchPriceFilterType[];
  discount: SearchDiscountFilterType[];
}

// 카테고리 타입
export interface CategoryType {
  product: ProductCategoryType[];
  searchFilter: SearchFiltersType;
  recomType: RecomType[];
  ageType: AgeType[];
}
/////////////////////////////////////////////

/**
 * 차트 데이터 타입을 정의 합니다.
 */
export interface ChartDataType {
  // 데이터 제목을 정의 합니다.
  labels: string[];
  datasets: Array<{
    // 여러 데이터 집합이 있는 바 차트에서 각 데이터 집합을 구별 합니다.
    label: string;
    // 차트 표시에 사용되는 데이터 입니다.
    data: Array<number>;
    // 각 조각의 색상을 정의합니다. 이는 데이터 배열의 각 요소에 대응하는 색상 배열입니다.
    backgroundColor: string[];
  }>;
}
