import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productReducer from "./reducer/ProductSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
  }
});

export default store;
