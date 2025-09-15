import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { productsService } from "@/services/productsService";
import { productAction } from "@/store/productsSlice";
import ProductCard from "./ProductCard";
import Header from "./Header";
import { Button } from "./ui/button";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products, filter, page, limit } = useAppSelector(
    (state) => state.products
  );

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

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedProducts = filteredProducts.slice(start, end);
  const totalPages = Math.ceil(filteredProducts.length / limit);

  const handlePrev = () => {
    if (page > 1) {
      dispatch(productAction.setPage(page - 1));
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      dispatch(productAction.setPage(page + 1));
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-wrap items-center justify-center gap-4 p-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center gap-4 my-4">
        <Button
          className="text-base"
          disabled={page === 1}
          onClick={handlePrev}
        >
          Prev
        </Button>

        <Button
          className="text-base"
          disabled={page === totalPages}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
      <span>
        {page} / {totalPages}
      </span>
    </div>
  );
};

export default ProductList;
