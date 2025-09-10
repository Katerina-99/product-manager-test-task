import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
}

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
    setProducts: () => {
      //будет сохраниять продукты из API
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
