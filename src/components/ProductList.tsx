import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { productsService } from "@/services/productsService";
import { productAction } from "@/store/productsSlice";
import ProductCard from "./ProductCard";
import Header from "./Header";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products, filter } = useAppSelector((state) => state.products);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productsService.fetchProducts();
        dispatch(productAction.setProducts(data));
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, [dispatch]);

  const filteredProducts =
    filter === "favorites" ? products.filter((p) => p.liked) : products;

  return (
    <div>
      <Header />
      <div className="flex flex-wrap items-center justify-center gap-4 p-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
