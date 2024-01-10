import { PaginationResponse } from "./CommonTypes";

export interface ProductInnerCategoryType {
  id: number;
  category: string;
}

// 상품 타입
export interface ProductType {
  id: number;
  type: string;
  title: string;
  price: number;
  discountPercentage: number;
  category: ProductInnerCategoryType;
  discountPrice: number;
  subTitle: string | null;
  brandName: string | null;
  imageUrl: string;
  brandImageUrl: string | null;
}

export interface DummyProductType {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  discountPrice: number;
  imageUrl: string;
}

export interface AgeDistributionType {
  type1: number;
  type2: number;
  type3: number;
  type4: number;
  type5: number;
}

export interface GenderDistributionType {
  man: number;
  woman: number;
}

export interface PurchaseStatusType {
  totalSales: number;
  satisfaction: string;
  age: AgeDistributionType;
  gender: GenderDistributionType;
}

// 상품 상세 타입
export interface ProductDetailType {
  id: number;
  category: ProductInnerCategoryType;
  like: number;
  info: string;
  purchaseStatus: PurchaseStatusType;
  title: string;
  subTitle: string | null;
  brandName: string | null;
  price: number;
  discountPercentage: number;
  discountPrice: number;
  imageUrl: string;
  brandImageUrl: string | null;
}

// 상품 리스트 타입
export interface ProductListType extends PaginationResponse {
  items: ProductType[];
}

// 상품 리스트 요청 타입
export interface ProductListRequestType {
  category: number;
  page?: number | null;
  limit?: number | null;
}
