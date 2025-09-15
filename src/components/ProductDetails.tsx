import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import productNotFound from "@/assets/productNotFound.gif";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = useAppSelector((state) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  const handleBack = () => {
    navigate("/products");
  };

  return (
    <>
      {!product ? (
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl mb-8">Product not find</p>
          <img
            src={productNotFound}
            alt="Product Not Found"
            className="w-sm mb-8"
          />
          <Button onClick={handleBack}>Back to list</Button>
        </div>
      ) : (
        <div className="flex justify-center">
          <Card className="w-full min-w-2xs max-w-2xl gap-4 py-6 md:py-8">
            <CardHeader className="md:px-8">
              <CardTitle className="text-2xl mb-2">{product?.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 md:px-8">
              <img
                src={product?.image}
                alt={product?.title}
                className="h-30 object-contain mx-auto sm:h-40 md:h-50 mb-3"
              />
              <p className="md:mb-3">{product?.description}</p>
              <p className="self-end mb-3">
                <span className="text-(--chart-2)">{product?.price}</span> $
              </p>
              <p className="self-start text-lg">
                Category: {product?.category}
              </p>
              <p className="self-start">
                Rate:{" "}
                <span className="text-(--chart-2)">
                  {" "}
                  {product?.rating?.rate}
                </span>
              </p>
              <p className="self-start mb-3">
                Count:{" "}
                <span className="text-(--chart-2)">
                  {product?.rating?.count}
                </span>
              </p>
            </CardContent>
            <CardFooter className="flex flex-col justify-between gap-4 md:px-8">
              <Button className="w-full text-lg" onClick={handleBack}>
                Back to list
              </Button>{" "}
              <Button
                variant="secondary"
                className="w-full text-lg"
                onClick={() => navigate(`/edit-product/${product.id}`)}
              >
                Edit
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
