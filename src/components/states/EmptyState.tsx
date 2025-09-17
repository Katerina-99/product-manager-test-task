import { useAppDispatch } from "@/hooks/hooks";
import { Button } from "../ui/button";
import { productAction } from "@/store/productsSlice";

const EmptyState = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <p className="text-xl">
        We couldn't find any products matching your search
      </p>
      <Button
        className="text-base"
        size={"lg"}
        onClick={() => {
          dispatch(productAction.setSearchQuery(""));
          dispatch(productAction.setFilter("all"));
        }}
      >
        Back to all products
      </Button>
    </div>
  );
};

export default EmptyState;
