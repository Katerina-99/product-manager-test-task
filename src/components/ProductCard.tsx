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
import { useNavigate } from "react-router-dom";

interface ProductCardProp {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProp) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(productAction.toggleLike(product.id));
  };

  const handleOpenDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(productAction.removeProduct(product.id));
  };

  return (
    <Card
      className="w-full min-w-2xs max-w-sm gap-4 py-4 cursor-pointer md:py-8"
      onClick={handleOpenDetails}
    >
      <CardHeader>
        <CardTitle className="truncate text-lg mb-2">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <img
          src={product.image}
          alt={product.title}
          className="h-30 object-contain mx-auto"
        />
        <p className="line-clamp-2">{product.description}</p>
        <p className="self-end mb-3">{product.price} $</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button
          className="hover:scale-105 transition duration-200"
          onClick={handleDelete}
        >
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
