import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { productAction } from "@/store/productsSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.products.filter);
  const categoryFilter = useAppSelector(
    (state) => state.products.categoryFilter
  );
  const products = useAppSelector((state) => state.products.products);

  const categoryNames: string[] = [];
  products.forEach((product) => {
    if (!categoryNames.includes(product.category)) {
      categoryNames.push(product.category);
    }
  });

  const handleFilterChange = (newFilter: "all" | "favorites") => {
    dispatch(productAction.setFilter(newFilter));
  };

  const handleCategoryChange = (value: string) => {
    dispatch(productAction.setCategoryFilter(value));
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
        All products
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

      <div className="ml-3 ">
        <Select
          value={categoryFilter || "all"}
          onValueChange={(value) => handleCategoryChange(value)}
        >
          <SelectTrigger className="min-w-[169px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All categories</SelectItem>
              {categoryNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
