import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/product";

interface ProductCardProp {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProp) => {
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
        <button>🗑️ Delete</button>
        <button>🤍</button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
