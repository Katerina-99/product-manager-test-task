import { Button } from "@/components/ui/button";
import FilterBar from "./FilterBar";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { productAction } from "@/store/productsSlice";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.products.searchQuery);

  const heandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(productAction.setSearchQuery(e.target.value));
  };

  return (
    <header className="bg-card rounded-lg border flex flex-col items-stretch justify-center gap-2 px-2 py-2 mx-auto sm:px-5 xl:max-w-[1280px]">
      <div className="flex justify-between gap-4">
        <Input
          placeholder="Search by name..."
          className="basis-full sm:basis-2/3 md:max-w-[50%]"
          value={searchQuery}
          onChange={heandleSearch}
        />
        <div className="flex gap-4 sm:gap-8">
          <Button
            onClick={() => navigate("/create-product")}
            className="text-base"
          >
            Add product
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <FilterBar />
    </header>
  );
};

export default Header;
