import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { productAction } from "@/store/productsSlice";

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.products.filter);

  const handleFilterChange = (newFilter: "all" | "favorites") => {
    dispatch(productAction.setFilter(newFilter));
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleFilterChange("all")}
        className={`hover:text-primary/90 ${
          filter === "all"
            ? "border-2  border-primary shadow-xs rounded-md h-9 px-2 hover:border-primary/90"
            : ""
        }`}
      >
        All
      </button>
      <span> / </span>
      <button
        onClick={() => handleFilterChange("favorites")}
        className={`hover:text-primary/90 ${
          filter === "favorites"
            ? "border-2  border-primary shadow-xs rounded-md h-9 px-2 hover:border-primary/90"
            : ""
        }`}
      >
        Favorites
      </button>
    </div>
  );
};

export default FilterBar;
