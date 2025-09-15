import { Button } from "@/components/ui/button";
import FilterBar from "./FilterBar";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { productAction } from "@/store/productsSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.products.searchQuery);

  const heandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(productAction.setSearchQuery(e.target.value));
  };

  return (
    <header className="flex flex-wrap items-center justify-center gap-4 py-2 px-10 sm:flex-nowrap sm:gap-8">
      <Input
        placeholder="Search by name..."
        className="basis-full sm:basis-1/3 "
        value={searchQuery}
        onChange={heandleSearch}
      />
      <FilterBar />
      <Button onClick={() => navigate("/create-product")} className="text-base">
        Add product
      </Button>
    </header>
  );
};

export default Header;
