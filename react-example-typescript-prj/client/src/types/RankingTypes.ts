import { ProductType } from "./ProductTypes";

export interface RankingRequestType {
  category: number;
}

// 랭킹 리스트 타입
export interface RankingListType extends RankingRequestType {
  category: number;
  items: ProductType[];
}
