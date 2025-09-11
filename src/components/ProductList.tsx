import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { productsService } from "@/services/productsService";
import { productAction } from "@/store/productsSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

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

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
