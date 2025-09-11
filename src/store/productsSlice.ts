import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

interface ProductsState {
  products: Product[];
  filter: "all" | "favorites";
}

const initialState: ProductsState = {
  products: [],
  filter: "all",
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    removeProduct: () => {
      //будет удалять продукт
    },
    addProduct: () => {
      //добавляет продукт
    },
    toggleLike: () => {
      //ставит\убирает лайк
    },
    setFilter: () => {
      //устанавливает фильтр
    },
  },
});

export const productReducer = ProductsSlice.reducer;
export const productAction = ProductsSlice.actions;
