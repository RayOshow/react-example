import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// thunk action
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ brand = null, category = null }) => {
    let uri = "http://localhost:5001/items";
    let separator = "?";

    if (brand) {
      uri += separator + "brand=Brand" + brand;
      separator = "&";
    }

    if (category) {
      uri += separator + "category=" + category;
    }

    const response = await fetch(uri);
    const data = await response.json();
    return data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    originalItems: [], // 상품 리스트 원본데이트
    items: [], // 상품 리스트 표시 데이터
    loading: true,
    error: false,
    isAllDisplay: true,
  },
  reducers: {
    // 찜하기 상태 변경
    toggleFavorite: (state, action) => {
      const id = action.payload;

      // 원본 리스트 업데이트 
      const originalItem = state.originalItems.find((item) => item.id === id);
      if (originalItem) {
        originalItem.favorite = !originalItem.favorite;
      }
      // 표시 데이터 업데이트 
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.favorite = !item.favorite;
      }
    },
    toggleTab: (state, action) => {
      state.isAllDisplay = !state.isAllDisplay;

      if (state.isAllDisplay) {
        // 모든 상품 표시일 경우 원본데이터를 다시 가져와 표시 한다.
        // 찜하기 시 원본 & 표시 데이터를 전부 바꾸기 때문에 그대로 가져와 써도 된다..
        state.items = [...state.originalItems];
      } else {
        // 찜하시 상품 표시 일경우, 현재 표시 데이터에서 찜하기 상품만 표시 한다.
        state.items = [
          ...(state.items = state.originalItems.filter(
            (item) => item.favorite === true
          )),
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // 찜하기는 프론트에서 관리 한다.
        // 서버에서 최초로 상품정보를 가져올 때는 초기값 false로 셋팅한다.
        state.originalItems = action.payload.map((item) => ({
          ...item,
          favorite: false,
        }));

        state.items = [...state.originalItems];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = true;
      });
  },
});

export const { toggleFavorite, toggleTab } = productSlice.actions;
export default productSlice.reducer;
