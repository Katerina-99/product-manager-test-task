import { Button } from "@/components/ui/button";
import FilterBar from "./FilterBar";

const Header = () => {
  return (
    <header className="flex items-center justify-center gap-8 py-2 px-10">
      <FilterBar />
      <Button className="text-base">Add product</Button>
    </header>
  );
};

export default Header;
