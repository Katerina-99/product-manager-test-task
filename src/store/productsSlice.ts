import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

interface ProductsState {
  products: Product[];
  filter: "all" | "favorites";
  page: number;
  limit: number;
  searchQuery: string;
  categoryFilter: string;
}

const initialState: ProductsState = {
  products: [],
  filter: "all",
  page: 1,
  limit: 6,
  searchQuery: "",
  categoryFilter: "",
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      if (state.products.length === 0) {
        state.products = action.payload;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    setFilter: (state, action: PayloadAction<"all" | "favorites">) => {
      state.filter = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload === "all" ? "" : action.payload;
      state.page = 1;
    },
  },
});

export const productReducer = ProductsSlice.reducer;
export const productAction = ProductsSlice.actions;
