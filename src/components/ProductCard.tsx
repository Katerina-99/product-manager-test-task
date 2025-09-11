import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductCard = () => {
  return (
    <Card className="w-full min-w-xs max-w-md gap-4 py-8">
      <CardHeader>
        <CardTitle>Product Title</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <img
          src="#"
          alt="Product Title"
          className="h-40 object-contain mx-auto"
        />
        <p>Product Description</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button>🗑️ Delete</button>
        <button>🤍</button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
