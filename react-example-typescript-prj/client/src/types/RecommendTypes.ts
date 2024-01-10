import { ProductType } from "./ProductTypes";

export interface RecommendRequestType {
  category: number;
  type: number;
}

export interface RecommendListType extends RecommendRequestType {
  items: ProductType[];
}

export interface RecommendListByIdType {
  items: ProductType[];
}
