import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { productsService } from "@/services/productsService";
import { productAction } from "@/store/productsSlice";
import ProductCard from "./ProductCard";
import Header from "./Header";
import { Button } from "./ui/button";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products, filter, page, limit, searchQuery, categoryFilter } =
    useAppSelector((state) => state.products);

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

  let filteredProducts = products;

  if (filter === "favorites") {
    filteredProducts = filteredProducts.filter((p) => p.liked);
  }

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === categoryFilter
    );
  }

  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

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

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 p-8">
          <p className="text-xl">
            We couldn't find any products matching your search
          </p>
          <Button
            className="text-base"
            size={"lg"}
            onClick={() => dispatch(productAction.setSearchQuery(""))}
          >
            Back to all products
          </Button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ProductList;
