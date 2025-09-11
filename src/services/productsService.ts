import type { Product } from "@/types/product";

const API_URL = "https://fakestoreapi.com/products";

export const productsService = {
  async fetchProducts(): Promise<Product[]> {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();

    return data.map((product: Product) => ({
      ...product,
      liked: false,
    }));
  },
};
