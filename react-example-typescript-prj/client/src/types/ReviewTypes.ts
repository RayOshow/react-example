import { PaginationResponse } from "./CommonTypes";

export interface ReviewRequestType {
  id: number;
  page?: number | null;
  limit?: number | null;
}

export interface ReviewType {
  id: number;
  productId: number;
  rating: number;
  writer: string;
  content: string;
}

export interface ReviewListType extends PaginationResponse {
  items: ReviewType[];
}
