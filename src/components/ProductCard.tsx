import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch } from "@/hooks/hooks";
import { productAction } from "@/store/productsSlice";
import type { Product } from "@/types/product";

interface ProductCardProp {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProp) => {
  const dispatch = useAppDispatch();

  const handleLike = () => {
    dispatch(productAction.toggleLike(product.id));
  };

  return (
    <Card className="w-full min-w-2xs max-w-sm gap-4 py-4 md:py-8">
      <CardHeader>
        <CardTitle className="truncate mb-2">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <img
          src={product.image}
          alt="Product Title"
          className="h-30 object-contain mx-auto"
        />
        <p className="line-clamp-2 mb-3">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button className="hover:scale-105 transition duration-200">
          🗑️ Delete
        </button>
        <button
          className="hover:scale-105 transition duration-200"
          onClick={handleLike}
        >
          {product.liked ? "❤️" : "🤍"}
        </button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
