import {
  PaginationResponse,
  SearchPriceFilterType,
  SearchDiscountFilterType,
} from "./CommonTypes";
import { ProductType } from "./ProductTypes";

export interface SearchQueryParamsType {
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  maxDiscount?: number;
  category?: number;
  createdAt?: Date;
  query?: string | null;
  page?: number | null;
  limit?: number | null;
}

export interface SearchFilterParamsType {
  price?: number | null;
  category?: number | null;
  discount?: number | null;
}

export interface SearchRadioGroupType {
  id: number;
  min?: number;
  max?: number;
  title?: string;
}

export interface SearchInfoFilterType {
  price: SearchPriceFilterType[];
  discount: SearchDiscountFilterType[];
}

export type UpdateParamsFunctionType = (
  prevParams: URLSearchParams,
) => URLSearchParams;

export interface SearchListType extends PaginationResponse {
  items: ProductType[];
}
