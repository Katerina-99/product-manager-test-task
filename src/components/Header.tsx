import { Button } from "@/components/ui/button";
import FilterBar from "./FilterBar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-center gap-8 py-2 px-10">
      <FilterBar />
      <Button onClick={() => navigate("/create-product")} className="text-base">
        Add product
      </Button>
    </header>
  );
};

export default Header;
